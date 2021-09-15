export interface SessionLimit {
    total: number;
    remaining: number;
    reset_after: number;
    max_concurrency: number;
}

export interface GatewayBot {
    url: string;
    shards: number;
    session_start_limit: SessionLimit;
}

