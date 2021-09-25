import { Clock, TTLCache } from '@brokerloop/ttlcache';
declare type CacheOption = {
    ttl: number;
    max: number;
    clock: Clock;
};
export declare class CacheService<K, V> extends TTLCache<K, V> {
    private options?;
    constructor(options?: CacheOption);
    toArray(): V[];
    flush(): void;
}
export {};
