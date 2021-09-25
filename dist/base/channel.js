"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StageVoiceChannelClass = exports.VoiceChannelClass = exports.TextChannelClass = exports.DMGroupClass = exports.ChannelClass = void 0;
const utils_1 = require("../utils");
const user_1 = require("./user");
class ChannelClass {
    constructor(channel) {
        this.channel = channel;
        this.id = this.channel.id;
        this.name = this.channel.name;
        this.type = utils_1.Util.channelTypes[this.channel.type.toString()];
        this.guildID = this.channel.guild_id;
        this.isNsfw = this.channel.nsfw;
        this.position = this.channel.position;
        this.parentID = this.channel.parent_id;
        this.permissionOverwrites = this.channel.permission_overwrites;
    }
    getAPIChannel() {
        return this.channel;
    }
}
exports.ChannelClass = ChannelClass;
class DMGroupClass extends ChannelClass {
    constructor(channel) {
        super(channel);
        this.recipients = this.getAPIChannel().recipients.map((x) => new user_1.UserClass(x));
    }
}
exports.DMGroupClass = DMGroupClass;
class TextChannelClass extends ChannelClass {
    constructor(channel) {
        super(channel);
        this.topic = this.getAPIChannel().topic;
        this.rateLimitPerUser = this.getAPIChannel().rate_limit_per_user;
    }
}
exports.TextChannelClass = TextChannelClass;
class VoiceChannelClass extends ChannelClass {
    constructor(channel) {
        super(channel);
        this.rtcRegion = this.getAPIChannel().rtc_region;
        this.bitrate = this.getAPIChannel().bitrate;
        this.userLimit = this.getAPIChannel().user_limit;
        this.videoQualityMode = this.getAPIChannel().video_quality_mode;
    }
}
exports.VoiceChannelClass = VoiceChannelClass;
class StageVoiceChannelClass extends VoiceChannelClass {
    constructor(channel) {
        super(channel);
    }
}
exports.StageVoiceChannelClass = StageVoiceChannelClass;
