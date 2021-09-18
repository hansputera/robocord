export interface Raw {
    op: number;
    d: Record<string, unknown>;
    s?: number;
    t?: string;
}

export * from './options';
export * from './gateway';
export * from './events';
export * from './util';