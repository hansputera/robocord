import { RZRWebSocket } from './client/websocket';
import { Logger } from './logging/logger';
import { RestClient } from './rest/rest';
import type { ClientEvents, ClientOptions } from './typings';
import { TypedEmitter as TinyTypedEmitter } from 'tiny-typed-emitter';
import type { ClientUser } from './base/clientUser';
import { GuildResource, UserResource } from './rest/resources';
export declare let loggerClient: Logger;
export declare class Client extends TinyTypedEmitter<ClientEvents> {
    private readonly token;
    private options?;
    user: ClientUser;
    constructor(token: string, options?: ClientOptions);
    ws: RZRWebSocket;
    _rest: RestClient;
    getGateway: () => Promise<import("./typings").GatewayBot>;
    guildResource: GuildResource;
    userResource: UserResource;
    caches: {
        user: import("./services/cache").CacheService<string, import("./base/user").UserClass>;
        guild: import("./services/cache").CacheService<string, import("./client/events/guild").GuildClassRest>;
    };
    run(): Promise<unknown>;
    getOptions(): ClientOptions;
}
