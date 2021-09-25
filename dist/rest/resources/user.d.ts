import type { Snowflake } from 'discord-api-types';
import { UserClass } from '../../base/user';
import type { RestClient } from '../rest';
export declare class UserResource {
    private rest;
    /**
     * Guilds cache
     */
    users: import("../../services/cache").CacheService<string, UserClass>;
    constructor(rest: RestClient);
    getMe(): Promise<UserClass>;
    fetch(userID: Snowflake): Promise<UserClass>;
}
