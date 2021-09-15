import type { Raw } from ".";

export interface ClientEvents {
    raw: (chunk: Raw) => void;
}