import type { APIMessage } from "discord-api-types";
import { MessageClass } from "../../base/message";
import type { Client } from "../../client";
import { CacheService } from "../../services/cache";
import { BaseEvent } from "../baseEvent";

export class MessageClassRest extends MessageClass {
    constructor(private client: Client, msg: APIMessage) {
        super(msg);
    }

    public async getGuild() {
        return await this.client.guildResource.fetch(this.guildID);
    }
}
const messageCaches: CacheService<string, MessageClassRest> = new CacheService({
    ttl: (60 * 60) * 1000,
    max: Infinity,
    clock: Date,
});
export class MessageEvent extends BaseEvent {
    public eventRequired = ['MESSAGE_CREATE', 'MESSAGE_UPDATE', 'MESSAGE_DELETE'];
    public eventAction = {
        [this.eventRequired.at(0)]: this.onCreate.name,
        [this.eventRequired.at(1)]: this.onEdit.name,
        [this.eventRequired.at(2)]: this.onDelete.name,
    };
    public messages = messageCaches;
    constructor() {
        super();
    };

    async onCreate() {
        const message = new MessageClassRest(this.client, this.raw.d as unknown as APIMessage);
        message.author = await this.client.userResource.fetch(message.author.id);
        this.messages.set(message.id, message);
        this.client.emit('newMessage', message);
    }

    onEdit() {
        const message = new MessageClassRest(this.client, this.raw.d as unknown as APIMessage);
        const oldMessage = this.messages.get(message.id);

        if (message.editedTimestamp !== null && oldMessage) {
            message.oldContent = oldMessage.content;
            this.messages.set(message.id, {
                ...oldMessage,
                ...message,
            } as MessageClassRest);
        } else {
            this.messages.set(message.id, message);
        }

        this.client.emit('updateMessage', oldMessage, message);
    }

    onDelete() {
        const oldMessage = this.messages.get((this.raw.d as Record<string, string>).id);
        this.messages.delete(oldMessage.id);

        this.client.emit('deletedMessage', oldMessage);
    }
}

export default MessageEvent;