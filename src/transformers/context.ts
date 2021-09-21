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
    async sendAPI(options?: RESTPostAPIChannelMessageJSONBody): Promise<Context> {
        try {
            const resp = this._client._rest.api.post('channels/' + this.channelID + '/messages', {
                json: {
                    allowed_mentions: this._client.getOptions(),
                    ...options,
                }
            });
            return new Context(this._client, new MessageClassRest(this._client, (await resp.json()) as APIMessage));
        } catch (err) {
            this._client.emit('error', err);
            console.error(err);
            return undefined;
        }
    }

    async sendEmbeds(embed: APIEmbed | APIEmbed[]): Promise<Context> {
        const response = await this.sendAPI({
            embeds: Array.isArray(embed) ? embed : [embed],
        });
        return response;
    }

    private async _delete() {
        if (this.author.id != this._client.user.id) return undefined;
        try {
            await this._client._rest.api.delete('channels/' + this.channelID + '/messages/' + this.id);
        } catch {
            return undefined;
        }
    }

    public async delete(after = 0) {
        if (!after) await this._delete();
        else setTimeout(() => this.delete(), after);
    }

    async send(text: string, options?: RESTPostAPIChannelMessageJSONBody): Promise<Context> {
        const response = await this.sendAPI({
            content: text,
            ...options,
        });
        return response;
    }

    async reply(text: string, options: RESTPostAPIChannelMessageJSONBody): Promise<Context> {
        const response = await this.sendAPI({
            message_reference: {
                message_id: this.id,
                channel_id: this.channelID,
                guild_id: this.guildID,
            },
            content: text,
            ...options,
        });

        return response;
    }
}