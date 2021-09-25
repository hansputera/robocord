import type { BaseEvent } from '../baseEvent';
export declare class LoaderEvent {
    private blacklistFiles;
    private _events;
    runEvent(_event: BaseEvent, methodName: string, args?: unknown[]): boolean;
    loadEvent(eventName: string): BaseEvent;
    searchEvent(t: string[] | string): BaseEvent[];
    load(): void;
}
