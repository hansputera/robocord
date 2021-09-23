import type { GatewayType, Raw, WebsocketOptions } from "../typings";
import WebSocket from 'ws';
import { URLSearchParams } from "url";
import { Exception } from "../exception/exception";
import { Util } from "../utils";
import type { Client } from "../client";
import { ClientUser } from "../base/clientUser";
import type { APIUser } from "discord-api-types";
import { LoaderEvent } from "./events/loader";
import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import pack, { Packable, unpack } from "@yukikaze-bot/erlpack";

export class RZRWebSocket {
    private ws: WebSocket;
    private gateway = 'gateway.discord.gg';
    private encodedOptions = new URLSearchParams({
        v: this.options ? (this.options.v ? this.options.v.toString() : '8') : '8',
        encoding: 'etf',
    });
    private gatewayType: GatewayType = 'wss';
    private startedConnect: number;
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
        if (existsSync(path.resolve(client.getOptions().sessionFile))) {
            const context = readFileSync(path.resolve(client.getOptions().sessionFile), {
                'encoding': 'utf-8',
            });
            if (context.trim().length) {
                this.session = context.trim();
            }
        }
        intents.forEach(intent => {
            this.intentss += intent;
        });
        this.loader.load();
    };
    private loader = new LoaderEvent();

    resume(): void {
        if (!this.session.length) throw new Exception('INVALID_SESSION', 'Websocket session token is empty');
        this.ws = new WebSocket(this.gatewayUrl);
        this.client.emit('reconnect');
        this.handle(this.ws);
    }

    connect(): void {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
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
            const data = {
                op: opcode,
                d: {
                    ...payload,
                    ...additional,
                },
            };

            const packed = pack(data);
            Util.globalBucket.add(() => this.ws.send(packed));
        } else {
            throw new Exception('WEBSOCKET_OFFLINE', 'Websocket not connected, couldn\'t send anything to discord');
        }
    }

    private handleRaw(chunk: WebSocket.Data) {
        const unpacked = unpack(chunk as Buffer) as { [x:string]: Packable; };
        const parses: Raw = {
            op: unpacked.op as number,
            s: unpacked.s as number,
            d: unpacked.d as Record<string, unknown>,
            t: unpacked.t as string,
        };

        this.client.emit('raw', parses);
        if (parses.t === 'READY') {
            this.client.user = new ClientUser(this.client, parses.d.user as APIUser);
            this.startedConnect = new Date().getTime();
            if (existsSync(path.resolve(this.client.getOptions().sessionFile))) writeFileSync(path.resolve(this.client.getOptions().sessionFile), parses.d.session_id as string);
            this.session = parses.d.session_id as string;
        } else if (parses.op === Util.opcodes.gateway.INVALID_SESSION) {
            this.session = '';
            this.ws = undefined;
            writeFileSync(path.resolve(this.client.getOptions().sessionFile), this.session);
            this.connect();
        } else if (parses.t === 'RESUMED' && !this.client.user) {
            Util.globalBucket.add(() => {
                this.client.userResource.getMe().then(user => {
                    if (user) {
                        this.client.user = new ClientUser(this.client, user);
                    }
                });
            }, true);
            this.startedConnect = new Date().getTime();
        } else {
            const events = this.loader.searchEvent(parses.t);
            if (events.length) {
                events.forEach(event => {
                    const diffSeconds = (new Date().getTime() - this.startedConnect) / 1000;
                    event.setClient(this.client);
                    event.setRaw(parses);

                    const action = event.eventAction[parses.t];
                    this.loader.runEvent(event, action, [diffSeconds < 2]);
                });
            }
        }
    }

    public getUptime() {
        return new Date().getTime() - this.startedConnect;
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