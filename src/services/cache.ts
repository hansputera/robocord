import { Clock, TTLCache } from "@brokerloop/ttlcache";

type CacheOption = {
    ttl: number;
    max: number;
    clock: Clock;
}
export class CacheService<K, V> extends TTLCache<K, V> {
    constructor(private options?: CacheOption) {
        super(options);
    }

    toArray(): V[] {
        const temp: V[] = [];
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