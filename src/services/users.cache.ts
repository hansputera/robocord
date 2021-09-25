import type { UserClass } from '../base/user';
import { CacheService } from './cache';

export const userCaches: CacheService<string, UserClass> = new CacheService({
  ttl: 60 * 60 * 1,
  max: Infinity,
  clock: Date,
});
