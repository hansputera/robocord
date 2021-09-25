import type { WebsocketOptions } from '../typings';
import { Client } from '../client';
declare type ConnectionType = 'offline' | 'reconnecting' | 'connected' | 'connecting';
export declare class RZRWebSocket {
    private client;
    private token;
    readonly intents: number[];
    private readonly options?;
    private connectionType;
    private ws;
    private gateway;
    private encodedOptions;
    private gatewayType;
    private inflate;
    private startedConnect;
    private session;
    private identifyProperties;
    private intentss;
    /**
     *
     * @param token - Discord bot token
     * @param options - Websocket options
     */
    constructor(client: Client, token: string, intents?: number[], options?: WebsocketOptions);
    private loader;
    resume(emitted?: boolean): void;
    connect(): void;
    private handle;
    send(opcode: number, payload: Record<string, unknown>, eventName?: string, sequenceNumber?: number): void;
    private handleRaw;
    getUptime(): number;
    getStatusConnection(): ConnectionType;
    isConnected(): boolean;
    get gatewayUrl(): string;
}
export {};
