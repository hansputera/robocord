import { RZRWebSocket } from "./client/websocket";
import { Logger } from "./logging/logger";
import { RestClient } from "./rest/rest";
import type { ClientEvents, ClientOptions, GatewayBot } from "./typings";
import { Util } from "./utils";
import { TypedEmitter as TinyTypedEmitter } from 'tiny-typed-emitter';

const optionsBuilder = (ops: ClientOptions): ClientOptions => {
    if (!ops) ops = {
        logging: false,
        intents: [],
        ws: {
            properties: {
                $os: 'Linux',
                $browser: 'Discord Linux',
                $device: 'Linux',
            },
            v: 8
        }
    };
    else if (!ops.ws) ops.ws = {
        properties: {
            $os: 'Linux',
            $browser: 'Discord Linux',
            $device: 'Linux',
        },
        v: 8
    };

    return ops;
}
export const loggerClient = new Logger('Client');
export class Client extends TinyTypedEmitter<ClientEvents> {
    public _gateway: GatewayBot;
    constructor(private readonly token: string, private options?: ClientOptions) {
        super();
        this.options = optionsBuilder(options);
        if (options.logging) loggerClient.info('Starting ...');
    }

    public ws = new RZRWebSocket(this, this.token, this.options ? this.options.intents : [Util.intents.GUILD], optionsBuilder(this.options).ws);
    private _rest = new RestClient(this.options.ws.v, this.token);

    public async run() {
        if (this.options.logging) loggerClient.warn('Connecting');
        return await new Promise((resolve, reject) => {
            this._rest.getGateway().then(g => {
                if (g) {
                    loggerClient.success('Token valid');
                    this._gateway = g;
                    this.ws.connect();
                    resolve(null);
                } else {
                    loggerClient.fatal('Token invalid');
                    reject(null);
                }
            });
        });
    }
}