"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageClass = void 0;
const utils_1 = require("../utils");
const user_1 = require("./user");
class MessageClass {
    constructor(msg) {
        var _a, _b, _c, _d, _e, _f, _g;
        this.msg = msg;
        this.id = this.msg.id;
        this.guildID = this.msg.guild_id;
        this.author = new user_1.UserClass(this.msg.author);
        this.content = this.msg.content;
        this.reactions = this.msg.reactions;
        this.timestamp = new Date(this.msg.timestamp);
        this.editedTimestamp = this.msg.edited_timestamp
            ? new Date(this.msg.edited_timestamp)
            : null;
        this.thread = this.msg.thread;
        this.pinned = this.msg.pinned;
        this.nonce = (_a = this.msg.nonce) !== null && _a !== void 0 ? _a : undefined;
        this.mentions = (_b = this.msg.mentions) !== null && _b !== void 0 ? _b : [];
        this.mentionRoles = (_c = this.msg.mention_roles) !== null && _c !== void 0 ? _c : [];
        this.mentionEveryone = this.msg.mention_everyone;
        this.mentionChannels = (_d = this.msg.mention_channels) !== null && _d !== void 0 ? _d : [];
        this.embeds = (_e = this.msg.embeds) !== null && _e !== void 0 ? _e : [];
        this.components = (_f = this.msg.components) !== null && _f !== void 0 ? _f : [];
        this.attachments = (_g = this.msg.attachments) !== null && _g !== void 0 ? _g : [];
        this.type = utils_1.Util.messageTypes[this.msg.type.toString()];
        this.oldContent = '';
        this.channelID = this.msg.channel_id;
    }
}
exports.MessageClass = MessageClass;
