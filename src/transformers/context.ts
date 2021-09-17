import type { APIMessage } from "discord-api-types";
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

    async send(text: string): Promise<APIMessage> {
        try {
            const resp = this._client._rest.api.post('channels/' + this.channelID + '/messages', {
                json: {
                    content: text,
                }
            });
            return (await resp.json()) as APIMessage;
        } catch (err) {
            console.error(err);
            return undefined;
        }
    }
}