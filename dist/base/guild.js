"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GuildClass = void 0;
class GuildClass {
    constructor(guild) {
        this.guild = guild;
        this.id = this.guild.id;
        this.name = this.guild.name;
        this.nsfwLevel = this.guild.nsfw_level;
        this.icon = this.guild.icon;
        this.description = this.guild.description;
        this.ownerID = this.guild.owner_id;
        this.verificationLevel = this.guild.verification_level;
        this.afkChannelID = this.guild.afk_channel_id;
        this.afkTimeout = this.guild.afk_timeout;
        this.roles = this.guild.roles;
        this.emojis = this.guild.emojis;
        this.members = this.guild.members;
        this.memberCount = this.guild.member_count;
        this.threads = this.guild.threads;
        this.vanityUrlCode = this.guild.vanity_url_code;
        this.stickers = this.guild.stickers;
        this.large = this.guild.large;
        this.premiumTier = this.guild.premium_tier;
        this.permissions = this.guild.permissions;
        this.banner = this.guild.banner;
        this.rulesChannelID = this.guild.rules_channel_id;
        this.publicUpdatesChannelID = this.guild.public_updates_channel_id;
    }
}
exports.GuildClass = GuildClass;
