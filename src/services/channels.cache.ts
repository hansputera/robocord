import type { DiscordChannel } from '../typings';
import { CacheService } from './cache';

export const channelCache: CacheService<string, DiscordChannel> =
  new CacheService({
    ttl: 60 * 60 * 1,
    max: Infinity,
    clock: Date,
  });
