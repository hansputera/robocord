import type { Raw } from ".";
import type { MessageClassRest } from "../client/events/message";

export interface ClientEvents {
    raw: (chunk: Raw) => void;
    ready: () => void;
    close: () => void;
    reconnect: () => void;
    newMessage: (message: MessageClassRest) => void;
    updateMessage: (oldMessage: MessageClassRest, newMessage: MessageClassRest) => void;
    deletedMessage: (message: MessageClassRest) => void;
}