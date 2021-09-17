import type { APIGuild } from "discord-api-types";
import { GuildClass } from "../../base/guild";
import type { Client } from "../../client";
import { CacheService } from "../../services/cache";
import type { Raw } from "../../typings";

export class GuildClassRest extends GuildClass {
    private _guild: APIGuild;
    constructor(
        private client: Client,
        guild: APIGuild
    ) {
        super(guild);

        this._guild = guild;
    };

    public async getOwner() {
        return await this.client.userResource.fetch(this._guild.owner_id);
    }
}

export const guildCaches: CacheService<GuildClassRest> = new CacheService();
export class GuildEvent {
    constructor(private client: Client, private readonly raw: Raw) {};

    onCreate(isStarted = false) {
        const guild = new GuildClassRest(this.client, this.raw.d as unknown as APIGuild);
        guildCaches.set(guild.id, guild);
        if (!isStarted) this.client.emit('newGuild', guild);
    }

    onLeave() {
        const guild = guildCaches.get((this.raw.d as Record<string, string>).id);
        guildCaches.delete(guild.id);
        this.client.emit('leaveGuild', guild);
    }
}