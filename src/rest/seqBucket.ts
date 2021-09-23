import type { LatencyRef } from "./bucket";

export class SequentialBucket {
    private remainining = 0;
    private limit = 0;
    public last = 0;

    constructor(limit: number, private latencyRef: LatencyRef = { latency: 0 }) {
        this.limit = this.remainining = limit;
    };

    private processing: NodeJS.Timeout | boolean = false;
    private reset = 0;
    private queue: Function[] = [];

    check(override = false) {
        if (!this.queue.length) {
            if (this.processing) {
                clearTimeout(this.processing as NodeJS.Timeout);
                this.processing = undefined;
            }
            return;
        }
        if (this.processing && !override) {
            return;
        }

        const now = Date.now();
        const offset = this.latencyRef.latency + (this.latencyRef.offset || 0);
        if (!this.reset || this.reset < now - offset) {
            this.reset = now - offset;
            this.remainining = this.limit;
        }
        this.last = now;
        if (this.remainining <= 0) {
            this.processing = setTimeout(() => {
                this.processing = undefined;
                this.check(true);
            }, Math.max(0, (this.reset || 0) - now + offset) + 1);
            return;
        }

        --this.remainining;
        this.processing = true;
        this.queue.shift()(() => {
            if (this.queue.length) {
                this.check(true);
            } else {
                this.processing = false;
            }
        });
    }

    add(func: Function, short = false) {
        if (short) this.queue.unshift(func);
        else this.queue.push(func);

        this.check();
    }
}