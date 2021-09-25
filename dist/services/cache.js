"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheService = void 0;
const ttlcache_1 = require("@brokerloop/ttlcache");
class CacheService extends ttlcache_1.TTLCache {
    constructor(options) {
        super(options);
        this.options = options;
    }
    toArray() {
        const temp = [];
        const vals = this.values();
        for (const v of vals) {
            temp.push(v);
        }
        return temp;
    }
    flush() {
        const keys = this.keys();
        for (const key of keys) {
            this.delete(key);
        }
    }
}
exports.CacheService = CacheService;
