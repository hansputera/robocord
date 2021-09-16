import type { APIUser } from "discord-api-types";
import type { Client } from "../client";
import { UserClass } from "./user";

export class ClientUser extends UserClass {
    private api: APIUser;
    constructor(private client: Client, user: APIUser) {
        super(user);
        this.api = user;
    }

    public async setUsername(username: string) {
        if (username.toLowerCase() === this.api.username.toLowerCase()) return false;
        try {
            const response = this.client._rest.api.patch('users/@me', {
                json: {
                    'username': username,
                }
            });
            const result = await response.json();
            if (result && typeof result === 'object') return true;
            else return false;
        } catch {
            return false;
        }
    }
}