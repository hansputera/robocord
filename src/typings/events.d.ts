import type { Raw } from ".";
import type { Client } from "../client";
import type { GuildClassRest } from "../client/events/guild";
import type { MessageClassRest } from "../client/events/message";
import type { Context } from "../transformers/context";

export interface BaseEventImplement {
    eventRequired: string[];
    eventAction: Record<string, string>;
    onEdit?(): Promise<void> | void;
    onUpdate?(): Promise<void> | void;
    onLeave?(): Promise<void> | void;
    onCreate?(): Promise<void> | void;
    onDelete?(): Promise<void> | void;
}

export interface ClientEvents {
    raw: (chunk: Raw) => void;
    ready: () => void;
    close: () => void;
    reconnect: () => void;

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
}