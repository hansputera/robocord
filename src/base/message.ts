import type { APIMessage } from "discord-api-types";
import { MessageTypees } from "../typings";
import { Util } from "../utils";
import { UserClass } from "./user";

export class MessageClass {
    constructor(private readonly msg: APIMessage) {};

    public id = this.msg.id;
    public guildID = this.msg.guild_id;
    public author = new UserClass(this.msg.author);
    public content = this.msg.content;
    public reactions = this.msg.reactions;
    public timestamp = new Date(this.msg.timestamp);
    public editedTimestamp = this.msg.edited_timestamp ? new Date(this.msg.edited_timestamp) : null;
    public thread = this.msg.thread;
    public pinned = this.msg.pinned;
    public nonce = this.msg.nonce ?? undefined;
    public mentions = this.msg.mentions ?? [];
    public mentionRoles = this.msg.mention_roles ?? [];
    public mentionEveryone = this.msg.mention_everyone;
    public mentionChannels = this.msg.mention_channels ?? [];
    public embeds = this.msg.embeds ?? [];
    public components = this.msg.components ?? [];
    public attachments = this.msg.attachments ?? [];
    public type = Util.messageTypes[this.msg.type.toString()] as MessageTypees;
    public oldContent = '';
    public channelID = this.msg.channel_id;
}