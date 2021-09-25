import type { Snowflake } from 'discord-api-types';
import type { DiscordChannel } from '../../typings';
import type { RestClient } from '../rest';
export declare class ChannelResource {
    private rest;
    channels: import("../../services/cache").CacheService<string, DiscordChannel>;
    constructor(rest: RestClient);
    fetch(channelID: Snowflake): Promise<DiscordChannel>;
}
