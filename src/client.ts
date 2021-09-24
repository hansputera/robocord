import { RZRWebSocket } from './client/websocket';
import { Logger } from './logging/logger';
import { RestClient } from './rest/rest';
import type { ClientEvents, ClientOptions } from './typings';
import { Util } from './utils';
import { TypedEmitter as TinyTypedEmitter } from 'tiny-typed-emitter';
import type { ClientUser } from './base/clientUser';
import { GuildResource, UserResource } from './rest/resources';
import { userCaches } from './services/users.cache';
import { guildCaches } from './client/events/guild';

const optionsBuilder = (ops: ClientOptions): ClientOptions => {
  if (!ops)
    ops = {
      allowedMentions: [],
      logging: undefined,
      intents: [],
      ws: {
        properties: {
          $os: 'Linux',
          $browser: 'Discord Linux',
          $device: 'Linux',
        },
        v: 9,
      },
    };
  else if (!ops.ws)
    ops.ws = {
      properties: {
        $os: 'Linux',
        $browser: 'Discord Linux',
        $device: 'Linux',
      },
      v: 9,
    };

  return ops;
};
export let loggerClient: Logger;
export class Client extends TinyTypedEmitter<ClientEvents> {
  public user: ClientUser;
  constructor(private readonly token: string, private options?: ClientOptions) {
    super();
    this.options = optionsBuilder(options);
    Util.globalStore.set('_logFile', this.options.logging);
    loggerClient = new Logger('Client');
    if (options.logging) loggerClient.info('Starting ...');
  }

  public ws = new RZRWebSocket(
    this,
    this.token,
    this.options ? this.options.intents : [Util.intents.GUILD],
    optionsBuilder(this.options).ws
  );
  public _rest = new RestClient(this.options.ws.v, this.token);
  public getGateway = this._rest.getGateway;

  public guildResource = new GuildResource(this._rest);
  public userResource = new UserResource(this._rest);

  public caches = {
    user: userCaches,
    guild: guildCaches,
  };

  public async run() {
    if (this.options.logging) loggerClient.warn('Connecting');
    return await new Promise((resolve, reject) => {
      this._rest.getGateway().then((g) => {
        if (g) {
          loggerClient.success('Token valid');
          this.ws.connect();
          resolve(null);
        } else {
          loggerClient.fatal('Token invalid');
          reject(null);
        }
      });
    });
  }

  public getOptions(): ClientOptions {
    return this.options;
  }
}
