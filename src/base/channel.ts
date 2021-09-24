import type { APIChannel } from 'discord-api-types';
import type { ChannelType } from '../typings';
import { Util } from '../utils';
import { UserClass } from './user';

export class ChannelClass {
  constructor(private channel: APIChannel) {}

  public id = this.channel.id;
  public name = this.channel.name;
  public type = Util.channelTypes[this.channel.type.toString()] as ChannelType;
  public guildID = this.channel.guild_id;
  public isNsfw = this.channel.nsfw;
  public position = this.channel.position;
  public parentID = this.channel.parent_id;
  public permissionOverwrites = this.channel.permission_overwrites;

  public getAPIChannel() {
    return this.channel;
  }
}

export class DMGroupClass extends ChannelClass {
  constructor(channel: APIChannel) {
    super(channel);
  }

  public recipients = this.getAPIChannel().recipients.map(
    (x) => new UserClass(x)
  );
}

export class TextChannelClass extends ChannelClass {
  constructor(channel: APIChannel) {
    super(channel);
  }

  public topic = this.getAPIChannel().topic;
  public rateLimitPerUser = this.getAPIChannel().rate_limit_per_user;
}

export class VoiceChannelClass extends ChannelClass {
  constructor(channel: APIChannel) {
    super(channel);
  }

  public rtcRegion = this.getAPIChannel().rtc_region;
  public bitrate = this.getAPIChannel().bitrate;
  public userLimit = this.getAPIChannel().user_limit;
  public videoQualityMode = this.getAPIChannel().video_quality_mode;
}

export class StageVoiceChannelClass extends VoiceChannelClass {
  constructor(channel: APIChannel) {
    super(channel);
  }
}
