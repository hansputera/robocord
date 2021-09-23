import { useState } from "../hooks/useState";

export type LatencyRef = {
    latency?: number;
    offset?: number;
    raw?: number[];
    timeOffset?: number;
    timeOffsets?: number[];
    lastTimeOffsetCheck?: number;
}
type BucketOptions = {
    latency?: LatencyRef;
    reservedTokens?: number;
};

type BucketDataCheck = {
    value: number;
    tokensAvailable: boolean;
    unreservedTokensAvailable: boolean;
};

export type BucketQueue = {
    func: Function;
    priority?: boolean;
};

export class Bucket {
    private tokens: number = 0;
    private lastSend: number = 0;
    private queue: BucketQueue[] = [];
    private timeout: NodeJS.Timeout;

    constructor(private tokenLimit: number, private interval: number, private options?: BucketOptions) {};
    private latencyRef: LatencyRef = this.options ? (this.options.latency ?? { latency: 0 }) : { latency: 0 };
    private lastReset = this.tokens = this.lastSend;
    private reservedTokens = this.options ? (this.options.reservedTokens ?? 0) : 0;

    check() {
        if (this.timeout || !this.queue.length) return;
        if (this.lastReset + this.interval + this.tokenLimit * this.latencyRef.latency < Date.now()) {
            this.lastReset = Date.now();
            this.tokens = Math.max(0, this.tokens - this.tokenLimit);
        }

        const { getState: getBucketData, setState: setBucketData } = useState<BucketDataCheck>({
            value: undefined,
            tokensAvailable: this.tokens < this.tokenLimit,
            unreservedTokensAvailable: this.tokens < (this.tokenLimit - this.reservedTokens)
        });

        while(this.queue.length && (getBucketData().unreservedTokensAvailable || (getBucketData().tokensAvailable && this.queue[0].priority))) {
            this.tokens++;
            setBucketData({
                tokensAvailable: this.tokens < this.tokenLimit,
                unreservedTokensAvailable: this.tokens < (this.tokenLimit - this.reservedTokens),
                value: this.latencyRef.latency - Date.now() + this.lastSend,
            });

            const item = this.queue.shift();
            if (!this.latencyRef || getBucketData().value <= 0) {
                item.func();
                this.lastSend = Date.now();
            } else {
                setTimeout(() => {
                    item.func();
                }, getBucketData().value);
                this.lastSend = Date.now() + getBucketData().value;
            }
        }

        if (this.queue.length && !this.timeout) {
            this.timeout = setTimeout(() => {
                this.timeout = undefined;
                this.check();
            }, this.tokens < this.tokenLimit ? this.latencyRef.latency : Math.max(0, this.lastReset + this.interval + this.tokenLimit * this.latencyRef.latency));
        }
    }

    add(func: Function, isPriority = false) {
        if (isPriority) {
            this.queue.unshift({func, priority: isPriority});
        } else {
            this.queue.push({func, priority: isPriority});
        }

        this.check();
    }
}