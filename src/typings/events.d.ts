import type { Raw } from ".";

export interface ClientEvents {
    raw: (chunk: Raw) => void;
    ready: () => void;
    close: () => void;
    reconnect: () => void;
}