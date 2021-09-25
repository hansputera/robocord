import type {
  APIEmbed,
  APIGuild,
  APIMessage,
  Snowflake,
} from 'discord-api-types';
import type {
  ChannelClass,
  DMGroupClass,
  StageVoiceChannelClass,
  TextChannelClass,
  VoiceChannelClass,
} from '../base/channel';
import type { MessageClassRest } from '../client/events/message';

export interface SessionLimit {
  total: number;
  remaining: number;
  reset_after: number;
  max_concurrency: number;
}

export interface GuildCreateOptions {
  region?: string;
  icon?: string;
  verification_level?: APIGuild['verification_level'];
  default_message_notification?: APIGuild['default_message_notifications'];
  explicit_content_filter?: APIGuild['explicit_content_filter'];
  roles?: APIGuild['roles'];
  channels?: APIGuild['channels'];
  afk_channel_id?: Snowflake;
  afk_timeout?: number;
  system_channel_id?: Snowflake;
  system_channel_flags?: APIGuild['system_channel_flags'];
}

export interface GatewayBot {
  url: string;
  shards: number;
  session_start_limit: SessionLimit;
}

export interface ActivityOption {
  name: string;
  type?: ActivityType;
  url?: string;
}

export type MessageComponentButtonStyle =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'danger'
  | 'link';
export type MessageComponentType = 'menu' | 'button' | 'action';
export type DiscordChannel =
  | TextChannelClass
  | VoiceChannelClass
  | StageVoiceChannelClass
  | ChannelClass
  | DMGroupClass;
export type ChannelType =
  | 'dm'
  | 'dm_group'
  | 'voice'
  | 'text'
  | 'voice_stage'
  | 'news'
  | 'store'
  | 'thread_news'
  | 'thread_public';
export type ActivityType =
  | 'PLAYING'
  | 'LISTENING'
  | 'COMPETING'
  | 'WATCHING'
  | 'CUSTOM'
  | 'STREAMING';
export type PresenceStatus =
  | 'idle'
  | 'online'
  | 'dnd'
  | 'invisible'
  | 'offline';
export type MessageTypees =
  | 'DEFAULT'
  | 'RECIPIENT_ADD'
  | 'RECIPIENT_REMOVE'
  | 'CALL'
  | 'CHANNEL_NAME_CHANGE'
  | 'CHANNEL_ICON_CHANGE'
  | 'CHANNEL_PINNED_MESSAGE'
  | 'GUILD_MEMBER_JOIN'
  | 'USER_PREMIUM_GUILD_SUBSCRIPTION'
  | 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1'
  | 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2'
  | 'USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3'
  | 'CHANNEL_FOLLOW_ADD'
  | 'GUILD_DISCOVERY_DISQUALIFIED'
  | 'GUILD_DISCOVERY_REQUALIFIED'
  | 'GUILD_DISCOVERY_GRACE_PERIOD_INITIAL_WARNING'
  | 'GUILD_DISCOVERY_GRACE_PERIOD_FINAL_WARNING'
  | 'THREAD_CREATED'
  | 'REPLY'
  | 'CHAT_INPUT_COMMAND'
  | 'THREAD_STARTER_MESSAGE'
  | 'GUILD_INVITE_REMINDER'
  | 'CONTEXT_MENU_COMMAND';
