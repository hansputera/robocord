import type { APIUser, Snowflake } from "discord-api-types";
import { UserClass } from "../../base/user";
import { CacheService } from "../../services/cache";
import type { RestClient } from "../rest";

const userCaches: CacheService<UserClass> = new CacheService();
export class UserResource {
    /**
     * Guilds cache
     */
    public users = userCaches;
    constructor(
        private rest: RestClient
    ) {};

    public async fetch(userID: Snowflake) {
        if (this.users.has(userID)) return this.users.get(userID);
        try {
            const response = this.rest.api.get(`users/${userID}`);
            const json = await response.json();
            return new UserClass(json as APIUser);
        } catch {
            return undefined;
        }
    }
}