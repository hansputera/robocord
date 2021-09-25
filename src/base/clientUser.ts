import type { APIUser } from 'discord-api-types';
import type { Client } from '../client';
import type { ActivityOption, PresenceStatus } from '../typings';
import { Util } from '../utils';
import { UserClass } from './user';

type PresenceOption = {
  status: PresenceStatus;
  activity: ActivityOption;
};

const fillActivityOption = (options?: ActivityOption) => {
  if (!options || (options && !options.name && !options.type))
    options = {
      name: 'Robocord',
      type: 'PLAYING',
    };
  else if (!options.name) options.name = 'Robocord';
  else if (!options.type) options.type = 'PLAYING';
  return options;
};
export const convertActivityType = (activity: ActivityOption['type']) => {
  switch (activity) {
    case 'PLAYING':
      return 0;
    case 'STREAMING':
      return 1;
    case 'LISTENING':
      return 2;
    case 'WATCHING':
      return 3;
    case 'CUSTOM':
      return 4;
    case 'COMPETING':
      return 5;
    default:
      return 0;
  }
};

export class ClientUser extends UserClass {
  private api: APIUser;
  private _presenceOptions: PresenceOption = {
    status: 'online',
    activity: {
      name: 'Robocord',
      type: 'PLAYING',
    },
  };

  constructor(private client: Client, user: APIUser) {
    super(user);
    this.api = user;
  }

  public getPresences() {
    return this._presenceOptions;
  }

  public async setUsername(username: string) {
    if (username.toLowerCase() === this.api.username.toLowerCase())
      return false;
    try {
      const response = this.client._rest.api.patch('users/@me', {
        json: {
          username: username,
        },
      });
      const result = await response.json();
      if (result && typeof result === 'object') return true;
      else return false;
    } catch {
      return false;
    }
  }

  public async setAsDefaultActivity() {
    await this.setActivity(
      this._presenceOptions.status,
      this._presenceOptions.activity
    );
  }

  public async setActivity(status: PresenceStatus, options?: ActivityOption) {
    const filled = fillActivityOption(options);
    this._presenceOptions = {
      status,
      activity: filled,
    };
    const object = {
      status,
      activities: [
        {
          name: filled.name,
          type: convertActivityType(filled.type),
          url: filled.url,
        },
      ],
      since: status === 'idle' ? Date.now() : 0,
      afk: false,
    };
    this.client.ws.send(Util.opcodes.gateway.PRESENCE_UPDATE, object);
  }
}
