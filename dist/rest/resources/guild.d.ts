import type { APIGuildPreview, Snowflake } from 'discord-api-types';
import { GuildClass } from '../../base/guild';
import type { GuildCreateOptions } from '../../typings';
import type { RestClient } from '../rest';
export declare class GuildResource {
    private rest;
    /**
     * Guilds cache
     */
    guilds: import("../../services/cache").CacheService<string, import("../../client/events/guild").GuildClassRest>;
    constructor(rest: RestClient);
    fetch(guildID: Snowflake): Promise<GuildClass>;
    create(name: string, options?: GuildCreateOptions): Promise<false | GuildClass>;
    getPreview(guildID: Snowflake): Promise<APIGuildPreview>;
}
