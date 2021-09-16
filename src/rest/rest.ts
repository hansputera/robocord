import got from 'got';
import { Logger } from '../logging/logger';
import type { GatewayBot } from "../typings";

export class RestClient {
    private _logger = new Logger('Rest');
    private baseURL = 'discord.com';
    public api = got.extend({
        prefixUrl: this.prefixUrl,
        headers: {
            'Authorization': `Bot ${this.token}`,
        }
    });

    constructor(private apiVersion: number, private token: string) {}

    private get prefixUrl(): string {
        return `https://${this.baseURL}/api/v${this.apiVersion}`;
    }
    public async getGateway(): Promise<GatewayBot> {
        try {
            const response = this.api.get('gateway/bot');
            const json = await response.json();
            return json as GatewayBot;
        } catch (e) {
            this._logger.error(e);
            return undefined;
        }
    }
}