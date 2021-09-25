import type { Client } from '../client';
import type { BaseEventImplement, Raw } from '../typings';
export declare abstract class BaseEvent implements BaseEventImplement {
    name: string;
    eventRequired: string[][];
    protected client: Client;
    protected raw: Raw;
    setRaw(raw: Raw): void;
    setClient(client: Client): void;
}
