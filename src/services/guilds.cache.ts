import type { GuildClass } from "../base/guild";
import { CacheService } from "./cache";

const guildCaches: CacheService<string, GuildClass> = new CacheService({
    ttl: (60 * 60) * 1,
    max: Infinity,
    clock: Date,
});