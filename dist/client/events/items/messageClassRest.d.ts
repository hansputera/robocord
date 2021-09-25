import type { APIMessage } from 'discord-api-types';
import { MessageClass } from '../../../base/message';
import type { Client } from '../../../client';
export declare class MessageClassRest extends MessageClass {
    private client;
    constructor(client: Client, msg: APIMessage);
    api: APIMessage;
    getGuild(): Promise<import("../../../base/guild").GuildClass>;
}
