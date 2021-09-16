import type { GatewayType, Raw, WebsocketOptions } from "../typings";
import WebSocket from 'ws';
import { URLSearchParams } from "url";
import { Exception } from "../exception/exception";
import { Util } from "../utils";
import type { Client } from "../client";
import { ClientUser } from "../base/clientUser";
import type { APIUser } from "discord-api-types";
import { MessageEvent } from "./events/message";

export class RZRWebSocket {
    private ws: WebSocket;
    private gateway = 'gateway.discord.gg';
    private encodedOptions = new URLSearchParams({
        v: this.options ? (this.options.v ? this.options.v.toString() : '8') : '8',
        encoding: 'json',
    });
    private gatewayType: GatewayType = 'wss';
    private session = '';
    private identifyProperties = {
        '$os': this.options.properties.$os ? this.options.properties.$os : 'Linux',
        '$browser': this.options.properties.$browser ? this.options.properties.$browser : 'Discord Linux',
        '$device': this.options.properties.$device ? this.options.properties.$device : 'Linux',
    };
    private intentss = 0;
    
    /**
     * 
     * @param token - Discord bot token
     * @param options - Websocket options
     */
    constructor(
        private client: Client,
        private token: string,
        readonly intents: number[] = [],
        private readonly options?: WebsocketOptions
    ) {
        intents.forEach(intent => {
            this.intentss += intent;
        });
    };

    resume(): void {
        if (!this.session.length) throw new Exception('INVALID_SESSION', 'Websocket session token is empty');
        this.ws = new WebSocket(this.gatewayUrl);
        this.client.emit('reconnect');
        this.handle(this.ws);
    }

    connect(): void {
        if (this.ws) {
            throw new Exception('WEBSOCKET_ALREADY_CONNECTED', 'Websocket is already connected');
        } else if (this.ws) {
            this.resume();
        } else {
            this.ws = new WebSocket(this.gatewayUrl);
            this.handle(this.ws);
        }
    }

    private handle(ws: WebSocket) {
        ws.on('open', () => {
            if (!this.session.length) this.send(Util.opcodes.gateway.IDENTIFY, {
                'token': this.token,
                'intents': this.intentss,
                'properties': this.identifyProperties,
            });
            else this.send(Util.opcodes.gateway.RESUME, {
                'token': this.token,
                'session_id': this.session,
                'seq': 1337,
            });
        }).on('close', () => {
            this.client.emit('close');
            this.resume();
        }).on('message', (chunk) => this.handleRaw(chunk));
    }

    public send(opcode: number, payload: Record<string, unknown>, eventName?: string, sequenceNumber?: number) {
        const additional = {};
        if (eventName) additional['t'] = eventName;
        if (sequenceNumber) additional['s'] = sequenceNumber;
        if (this.ws) {
            this.ws.send(JSON.stringify({
                op: opcode,
                d: {
                    ...payload,
                    ...additional,
                },
            }));
        } else {
            throw new Exception('WEBSOCKET_OFFLINE', 'Websocket not connected, couldn\'t send anything to discord');
        }
    }

    private handleRaw(chunk: WebSocket.Data) {
        const eventMessageData = ['MESSAGE_CREATE', 'MESSAGE_UPDATE', 'MESSAGE_DELETE'];

        const parses: Raw = JSON.parse(chunk.toString('utf8'));
        const m = new MessageEvent(this.client, parses);
        this.client.emit('raw', parses);

        if (parses.t === 'READY') {
            this.client.user = new ClientUser(this.client, parses.d.user as APIUser);
            this.client.emit('ready');
            this.session = parses.d.session_id as string;
        } else if (eventMessageData.includes(parses.t)) {
            switch(parses.t) {
                case eventMessageData[0]:
                    m.onCreate();
                    break;
                case eventMessageData[1]:
                    m.onEdit();
                    break;
                case eventMessageData[2]:
                    m.onDelete();
                    break;
            }
        }
    }

    public isConnected() {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            return true;
        } else {
            return false;
        }
    }

    public get gatewayUrl(): string {
        return `${this.gatewayType}://${this.gateway}?${this.encodedOptions}`;
    }
}