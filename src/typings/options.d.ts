import type { AllowedMentions } from ".";

type WebsocketProperties = {
    $os: string;
    $browser: string;
    $device: string;
}

export type GatewayType = "ws" | "wss";
export interface WebsocketOptions {
    v?: number;
    properties?: WebsocketProperties;
}
export interface ClientOptions {
    logging?: boolean;
    ws?: WebsocketOptions;
    intents?: number[];
    allowedMentions?: AllowedMentions[];
}