import type { APIMessage } from "discord-api-types";
import { CacheService } from "../../services/cache";
import { Context } from "../../transformers/context";
import { BaseEvent } from "../baseEvent";
import { MessageClassRest } from "./items/messageClassRest";


const messageCaches: CacheService<string, Context> = new CacheService({
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
        this.messages.set(message.id, new Context(this.client, message));
        this.client.emit('newMessage', new Context(this.client, message));
    }

    onEdit() {
        const message = new MessageClassRest(this.client, this.raw.d as unknown as APIMessage);
        const oldMessage = this.messages.get(message.id);

        if (message.editedTimestamp !== null && oldMessage) {
            message.oldContent = oldMessage.content;
            this.messages.set(message.id, {
                ...oldMessage,
                ...message,
            } as Context);
        } else {
            this.messages.set(message.id, new Context(this.client, message));
        }

        this.client.emit('updateMessage', oldMessage, new Context(this.client, message));
    }

    onDelete() {
        const oldMessage = this.messages.get((this.raw.d as Record<string, string>).id);
        this.messages.delete(oldMessage.id);

        this.client.emit('deletedMessage', oldMessage);
    }
}

export default MessageEvent;