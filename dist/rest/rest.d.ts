import type { GatewayBot } from '../typings';
export declare class RestClient {
    private apiVersion;
    private token;
    private _logger;
    private baseURL;
    api: import("got").Got;
    constructor(apiVersion: number, token: string);
    private get prefixUrl();
    getGateway(): Promise<GatewayBot>;
}
