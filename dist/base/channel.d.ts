import type { APIChannel } from 'discord-api-types';
import type { ChannelType } from '../typings';
import { UserClass } from './user';
export declare class ChannelClass {
    private channel;
    constructor(channel: APIChannel);
    id: string;
    name: string;
    type: ChannelType;
    guildID: string;
    isNsfw: boolean;
    position: number;
    parentID: string;
    permissionOverwrites: import("discord-api-types").APIOverwrite[];
    getAPIChannel(): APIChannel;
}
export declare class DMGroupClass extends ChannelClass {
    constructor(channel: APIChannel);
    recipients: UserClass[];
}
export declare class TextChannelClass extends ChannelClass {
    constructor(channel: APIChannel);
    topic: string;
    rateLimitPerUser: number;
}
export declare class VoiceChannelClass extends ChannelClass {
    constructor(channel: APIChannel);
    rtcRegion: string;
    bitrate: number;
    userLimit: number;
    videoQualityMode: import("discord-api-types").VideoQualityMode;
}
export declare class StageVoiceChannelClass extends VoiceChannelClass {
    constructor(channel: APIChannel);
}
