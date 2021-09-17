import { TTLCache } from "@brokerloop/ttlcache";
import type { DiscordChannel } from "../typings";

export const channelCache: TTLCache<string, DiscordChannel> = new TTLCache({
    ttl: (60*60)*1,
    max: Infinity,
    clock: Date,
});