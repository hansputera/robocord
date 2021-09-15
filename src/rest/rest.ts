import got from 'got';
import { Logger } from '../logging/logger';
import type { GatewayBot } from "../typings";

export class RestClient {
    private _logger = new Logger('Rest');
    private gateway: GatewayBot = undefined;
    private statsRunner = {
        'gateway': undefined,
    };
    private baseURL = 'discord.com';
    private api = got.extend({
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
            this.gateway = json as GatewayBot;
            this.statsRunner.gateway = setInterval(() => {
                this.getGateway();
            }, this.gateway.session_start_limit.max_concurrency < 5 ? 10000 : 5000);
            return json as GatewayBot;
        } catch (e) {
            this._logger.error(e);
            return undefined;
        }
    }

    public stopRunner(runnerName: string) {
        const runner = this.statsRunner[runnerName];
        if (runner) {
            if (typeof runner === 'object') {
                clearInterval(runner);
                delete this.statsRunner[runnerName];
            } else {
                return;
            }
        }
    }
}