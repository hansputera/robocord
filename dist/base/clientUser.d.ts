import type { APIUser } from 'discord-api-types';
import type { Client } from '../client';
import type { ActivityOption, PresenceStatus } from '../typings';
import { UserClass } from './user';
declare type PresenceOption = {
    status: PresenceStatus;
    activity: ActivityOption;
};
export declare const convertActivityType: (activity: ActivityOption['type']) => 1 | 2 | 3 | 0 | 4 | 5;
export declare class ClientUser extends UserClass {
    private client;
    private api;
    private _presenceOptions;
    constructor(client: Client, user: APIUser);
    getPresences(): PresenceOption;
    setUsername(username: string): Promise<boolean>;
    setAsDefaultActivity(): Promise<void>;
    setActivity(status: PresenceStatus, options?: ActivityOption): Promise<void>;
}
export {};
