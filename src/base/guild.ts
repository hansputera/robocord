import { APIGuild } from "discord-api-types";

export class GuildClass {
    constructor(
        private readonly guild: APIGuild
    ) {};

    public id = this.guild.id;
    public name = this.guild.name;
    public nsfwLevel = this.guild.nsfw_level;
    public icon = this.guild.icon;
    public description = this.guild.description;
    public ownerID = this.guild.owner_id;
    public verificationLevel = this.guild.verification_level;
    public afkChannelID = this.guild.afk_channel_id;
    public afkTimeout = this.guild.afk_timeout;
    public roles = this.guild.roles;
    public emojis = this.guild.emojis;
    public members = this.guild.members;
    public memberCount = this.guild.member_count;
    public threads = this.guild.threads;
    public vanityUrlCode = this.guild.vanity_url_code;
    public stickers = this.guild.stickers;
    public large = this.guild.large;
    public premiumTier = this.guild.premium_tier;
    public permissions = this.guild.permissions;
    public banner = this.guild.banner;
    public rulesChannelID = this.guild.rules_channel_id;
    public publicUpdatesChannelID = this.guild.public_updates_channel_id;

}