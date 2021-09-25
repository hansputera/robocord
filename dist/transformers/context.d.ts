import type { APIEmbed, RESTPatchAPIChannelMessageJSONBody, RESTPostAPIChannelMessageJSONBody } from 'discord-api-types';
import type { Client } from '../client';
import { MessageClassRest } from '../client/events/items/messageClassRest';
export declare class Context extends MessageClassRest {
    private _client;
    constructor(client: Client, msg: MessageClassRest);
    /**
     * Carefull when use it.
     *
     * @param options - API Send Message Options
     */
    sendAPI(options?: RESTPostAPIChannelMessageJSONBody): Promise<Context>;
    edit(content: string, options?: RESTPatchAPIChannelMessageJSONBody): Promise<Context>;
    sendEmbeds(embed: APIEmbed | APIEmbed[]): Promise<Context>;
    private _delete;
    delete(after?: number): Promise<void>;
    send(text: string, options?: RESTPostAPIChannelMessageJSONBody): Promise<Context>;
    reply(text: string, options?: RESTPostAPIChannelMessageJSONBody): Promise<Context>;
}
