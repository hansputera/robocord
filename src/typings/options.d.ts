type WebsocketEncodingType = "json" | "etf";
type CompressType = "zlib-stream";

export type GatewayType = "ws" | "wss";
export interface WebsocketOptions {
    v?: number;
    encoding?: WebsocketEncodingType;
    compress?: CompressType;
}
export interface ClientOptions {
    logging: boolean;
    token: string;
    ws?: WebsocketOptions;
    intents?: number[];
}