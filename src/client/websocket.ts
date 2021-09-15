import type { GatewayType, WebsocketOptions } from "../typings";
import WebSocket from 'ws';
import { URLSearchParams } from "url";
import { Exception } from "../exception/exception";
import { Util } from "../utils";
import type { Client } from "../client";

export class RZRWebSocket {
    private connected: boolean = false;
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
        this.handle(this.ws);
    }

    connect(): void {
        if (this.isConnected && this.ws) {
            throw new Exception('WEBSOCKET_ALREADY_CONNECTED', 'Websocket is already connected');
        } else if (!this.isConnected && this.ws) {
            this.resume();
        }
    }

    private handle(ws: WebSocket) {
        ws.on('open', () => {
            this.connected = true;
            this.send(Util.opcodes.gateway.IDENTIFY, {
                'token': this.token,
                'intents': this.intentss,
                'properties': this.identifyProperties,
            });
        }).on('close', () => {
            this.connected = false;
            this.resume();
        }).on('message', (chunk) => this.handleRaw(chunk));
    }

    public send(opcode: number, payload: Record<string, unknown>, eventName?: string, sequenceNumber?: number) {
        const additional = {};
        if (eventName) additional['t'] = eventName;
        if (sequenceNumber) additional['s'] = sequenceNumber;

        if (this.isConnected && this.ws) {
            this.ws.send(JSON.stringify({
                op: opcode,
                d: payload,
                ...additional
            }));
        } else {
            throw new Exception('WEBSOCKET_OFFLINE', 'Websocket not connected, couldn\'t send anything to discord');
        }
    }

    private handleRaw(chunk: WebSocket.Data) {
        const parses = JSON.parse(chunk.toString('utf8'));
        this.client.emit('raw', parses);
    }

    public get isConnected(): boolean {
        return this.connected;
    }

    public get gatewayUrl(): string {
        return `${this.gatewayType}://${this.gateway}?${this.encodedOptions}`;
    }
}