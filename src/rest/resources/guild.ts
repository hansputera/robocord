import type { APIGuild, APIGuildPreview, Snowflake } from 'discord-api-types';
import { GuildClass } from '../../base/guild';
import { guildCaches } from '../../client/events/guild';
import type { GuildCreateOptions } from '../../typings';
import type { RestClient } from '../rest';

export class GuildResource {
  /**
   * Guilds cache
   */
  public guilds = guildCaches;
  constructor(private rest: RestClient) {}

  public async fetch(guildID: Snowflake) {
    if (this.guilds.has(guildID)) return this.guilds.get(guildID);
    try {
      const response = this.rest.api.get(`guilds/${guildID}`);
      return (await response.json()) as GuildClass;
    } catch {
      return undefined;
    }
  }

  public async create(name: string, options?: GuildCreateOptions) {
    try {
      const response = this.rest.api.post('guilds', {
        json: {
          name,
          ...options,
        },
      });
      return new GuildClass((await response.json()) as APIGuild);
    } catch {
      return false;
    }
  }

  public async getPreview(guildID: Snowflake) {
    try {
      const response = this.rest.api.get('guilds/' + guildID + '/preview');
      return (await response.json()) as APIGuildPreview;
    } catch {
      return undefined;
    }
  }
}
