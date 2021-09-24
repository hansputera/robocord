import type { APIGuild } from 'discord-api-types';
import { GuildClass } from '../../base/guild';
import type { Client } from '../../client';
import { CacheService } from '../../services/cache';
import { BaseEvent } from '../baseEvent';

export class GuildClassRest extends GuildClass {
  private _guild: APIGuild;
  constructor(private client: Client, guild: APIGuild) {
    super(guild);

    this._guild = guild;
  }

  public async getOwner() {
    return await this.client.userResource.fetch(this._guild.owner_id);
  }
}

export const guildCaches: CacheService<string, GuildClassRest> =
  new CacheService({
    ttl: 60 * 60 * 1000,
    max: Infinity,
    clock: Date,
  });
export class GuildEvent extends BaseEvent {
  public eventRequired = ['GUILD_CREATE', 'GUILD_UPDATE', 'GUILD_DELETE'];
  public eventAction = {
    [this.eventRequired[0]]: this.onCreate.name,
    [this.eventRequired[1]]: this.onUpdate.name,
    [this.eventRequired[2]]: this.onLeave.name,
  };

  onCreate(isStarted = false) {
    const guild = new GuildClassRest(
      this.client,
      this.raw.d as unknown as APIGuild
    );
    guildCaches.set(guild.id, guild);
    if (!isStarted) this.client.emit('newGuild', guild);
    else this.client.emit('ready');
  }

  onLeave() {
    const guild = guildCaches.get((this.raw.d as Record<string, string>).id);
    guildCaches.delete(guild.id);
    this.client.emit('leaveGuild', guild);
  }

  onUpdate() {
    const guild = new GuildClassRest(
      this.client,
      this.raw.d as unknown as APIGuild
    );
    const oldGuild = guildCaches.get(guild.id);

    this.client.emit('updateGuild', oldGuild, guild);
  }
}

export default GuildEvent;
