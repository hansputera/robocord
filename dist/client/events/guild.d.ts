import type { APIGuild } from 'discord-api-types';
import { GuildClass } from '../../base/guild';
import { UserClass } from '../../base/user';
import type { Client } from '../../client';
import { CacheService } from '../../services/cache';
import { BaseEvent } from '../baseEvent';
export declare class GuildClassRest extends GuildClass {
    private client;
    private _guild;
    constructor(client: Client, guild: APIGuild);
    getOwner(): Promise<UserClass>;
}
export declare const guildCaches: CacheService<string, GuildClassRest>;
export declare class GuildEvent extends BaseEvent {
    eventRequired: string[][];
    onCreate(isStarted?: boolean): void;
    onLeave(): void;
    onUpdate(): void;
    onBanAdd(): void;
    onBanRemove(): void;
}
export default GuildEvent;
