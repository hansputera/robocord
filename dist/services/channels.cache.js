"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.channelCache = void 0;
const cache_1 = require("./cache");
exports.channelCache = new cache_1.CacheService({
    ttl: 60 * 60 * 1,
    max: Infinity,
    clock: Date,
});
