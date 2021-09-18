import type { APIEmbed, APIMessage, RESTPostAPIChannelMessageJSONBody } from "discord-api-types";
import type { Client } from "../client";
import { MessageClassRest } from "../client/events/items/messageClassRest";

export class Context extends MessageClassRest {
    private _client: Client;
    constructor(
        client: Client,
        msg: MessageClassRest
    ) {
        super(client, msg.api);

        this._client = client;
    };

    /**
     * Carefull when use it.
     * 
     * @param options - API Send Message Options
     */
    async sendAPI(options?: RESTPostAPIChannelMessageJSONBody): Promise<APIMessage> {
        try {
            const resp = this._client._rest.api.post('channels/' + this.channelID + '/messages', {
                json: {
                    allowed_mentions: this._client.getOptions(),
                    ...options,
                }
            });
            return (await resp.json()) as APIMessage;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }

    async sendEmbeds(embed: APIEmbed | APIEmbed[]): Promise<APIMessage> {
        const response = await this.sendAPI({
            embeds: Array.isArray(embed) ? embed : [embed],
        });
        return response;
    }

    async sendText(text: string): Promise<APIMessage> {
        const response = await this.sendAPI({
            content: text,
        });
        return response;
    }
}