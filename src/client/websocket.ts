import type { GatewayType, WebsocketOptions } from "../typings";
import WebSocket from 'ws';
import { URLSearchParams } from "url";

export class RZRWebSocket {
    private connected: boolean;
    private ws: WebSocket;
    private gateway = 'gateway.discord.gg';
    private encodedOptions = new URLSearchParams({
        v: this.options.v ? this.options.v.toString() : '7',
        encoding: this.options.encoding ? this.options.encoding : 'json',
        compress: this.options.compress,
    });
    private gatewayType: GatewayType = 'wss';
    
    /**
     * 
     * @param token - Discord bot token
     * @param options - Websocket options
     */
    constructor(
        private token: string,
        private readonly options?: WebsocketOptions
    ) {};

    connect() {
        
    }

    public get isConnected(): boolean {
        return this.connected;
    }

    public get gatewayUrl(): string {
        return `${this.gatewayType}://${this.gateway}?${this.encodedOptions}`;
    }
}