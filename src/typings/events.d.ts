import type { Raw } from '.';
import type { UserClass } from '../base/user';
import type { Client } from '../client';
import type { GuildClassRest } from '../client/events/guild';
import type { MessageClassRest } from '../client/events/message';
import type { Context } from '../transformers/context';

export interface BaseEventImplement {
  eventRequired: string[][];
}

export interface ClientEvents {
  raw: (chunk: Raw) => void;
  ready: () => void;
  close: (code: number, reason?: string) => void;
  reconnect: () => void;
  error: (err: Error) => void;
  _hello: () => void;

  /**
   * Message
   */
  newMessage: (message: Context) => void;
  updateMessage: (oldMessage: Context, newMessage: Context) => void;
  deletedMessage: (message: Context) => void;

  /**
   * Guilds
   */
  newGuild: (guild: GuildClassRest) => void;
  leaveGuild: (guild: GuildClassRest) => void;
  updateGuild: (oldGuild: GuildClassRest, newGuild: GuildClassRest) => void;
  banAdd: (guild: GuildClassRest, user: UserClass) => void;
  banDelete: (guild: GuildClassRest, user: UserClass) => void;
}
