import { CacheService } from '../../services/cache';
import { Context } from '../../transformers/context';
import { BaseEvent } from '../baseEvent';
export declare class MessageEvent extends BaseEvent {
    eventRequired: string[][];
    messages: CacheService<string, Context>;
    constructor();
    onCreate(): Promise<void>;
    onEdit(): void;
    onDelete(): void;
}
export default MessageEvent;
