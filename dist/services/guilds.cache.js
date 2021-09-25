"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cache_1 = require("./cache");
const guildCaches = new cache_1.CacheService({
    ttl: 60 * 60 * 1,
    max: Infinity,
    clock: Date,
});
