import type { Snowflake } from "discord-api-types";
import { channelCache } from "../../services/channels.cache";
import type { DiscordChannel } from "../../typings";
import type { RestClient } from "../rest";

export class ChannelResource {
    public channels = channelCache;

    constructor(private rest: RestClient) {};
    async fetch(channelID: Snowflake) {
        if (this.channels.has(channelID)) return this.channels.get(channelID);
        try {
            const response = this.rest.api.get('channels/' + channelID);
            return (await response.json()) as DiscordChannel;
        } catch {
            return undefined;
        }
    }
}