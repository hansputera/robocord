import NodeCache from "node-cache";

export class CacheService<V> {
    constructor(private readonly ttl = (60 * 60) * 1) {}
    public cache = new NodeCache({
        stdTTL: this.ttl,
        checkperiod: this.ttl * 0.2,
        useClones: false,
    });

    public get(key: NodeCache.Key): V {
        const data = this.cache.get(key);
        return data as V;
    }

    public set(key: NodeCache.Key, value: V): boolean {
        return this.cache.set(key, value);    
    }

    public has(key: NodeCache.Key): boolean {
        return this.cache.has(key);
    }

    public delete(keys: NodeCache.Key | NodeCache.Key[]): void {
        this.cache.del(keys);
    }

    public flush(): void {
        this.cache.flushAll();
    }

    public toArray(): V[] {
       const keys = this.cache.keys();
       return keys.map(x => this.get(x)); 
    }
}
