import { APIGuild } from 'discord-api-types';
export declare class GuildClass {
    private readonly guild;
    constructor(guild: APIGuild);
    id: string;
    name: string;
    nsfwLevel: import("discord-api-types").GuildNSFWLevel;
    icon: string;
    description: string;
    ownerID: string;
    verificationLevel: import("discord-api-types").GuildVerificationLevel;
    afkChannelID: string;
    afkTimeout: number;
    roles: import("discord-api-types").APIRole[];
    emojis: import("discord-api-types").APIEmoji[];
    members: import("discord-api-types").APIGuildMember[];
    memberCount: number;
    threads: import("discord-api-types").APIChannel[];
    vanityUrlCode: string;
    stickers: import("discord-api-types").APISticker[];
    large: boolean;
    premiumTier: import("discord-api-types").GuildPremiumTier;
    permissions: string;
    banner: string;
    rulesChannelID: string;
    publicUpdatesChannelID: string;
}
