import type { APIMessage } from 'discord-api-types';
import { MessageTypees } from '../typings';
import { UserClass } from './user';
export declare class MessageClass {
    private readonly msg;
    constructor(msg: APIMessage);
    id: string;
    guildID: string;
    author: UserClass;
    content: string;
    reactions: import("discord-api-types").APIReaction[];
    timestamp: Date;
    editedTimestamp: Date;
    thread: import("discord-api-types").APIChannel;
    pinned: boolean;
    nonce: string | number;
    mentions: (import("discord-api-types").APIUser & {
        member?: Omit<import("discord-api-types").APIGuildMember, "user">;
    })[];
    mentionRoles: string[];
    mentionEveryone: boolean;
    mentionChannels: import("discord-api-types").APIChannelMention[];
    embeds: import("discord-api-types").APIEmbed[];
    components: import("discord-api-types").APIActionRowComponent[];
    attachments: import("discord-api-types").APIAttachment[];
    type: MessageTypees;
    oldContent: string;
    channelID: string;
}
