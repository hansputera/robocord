import type { APIUser, Snowflake } from 'discord-api-types';
import { UserClass } from '../../base/user';
import { userCaches } from '../../services/users.cache';
import type { RestClient } from '../rest';

export class UserResource {
  /**
   * Guilds cache
   */
  public users = userCaches;
  constructor(private rest: RestClient) {}

  public async getMe(): Promise<UserClass> {
    try {
      const response = this.rest.api.get('users/@me');
      const json = await response.json();
      return new UserClass(json as APIUser);
    } catch {
      return undefined;
    }
  }

  public async fetch(userID: Snowflake) {
    if (this.users.has(userID)) return this.users.get(userID);
    try {
      const response = this.rest.api.get(`users/${userID}`);
      const json = await response.json();
      return new UserClass(json as APIUser);
    } catch {
      return undefined;
    }
  }
}
