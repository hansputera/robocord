"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageEvent = void 0;
const cache_1 = require("../../services/cache");
const context_1 = require("../../transformers/context");
const baseEvent_1 = require("../baseEvent");
const messageClassRest_1 = require("./items/messageClassRest");
const messageCaches = new cache_1.CacheService({
    ttl: 60 * 60 * 1000,
    max: Infinity,
    clock: Date,
});
class MessageEvent extends baseEvent_1.BaseEvent {
    constructor() {
        super();
        this.eventRequired = [
            ['MESSAGE_CREATE', this.onCreate.name],
            ['MESSAGE_UPDATE', this.onEdit.name],
            ['MESSAGE_DELETE', this.onDelete.name],
        ];
        this.messages = messageCaches;
    }
    onCreate() {
        return __awaiter(this, void 0, void 0, function* () {
            const message = new messageClassRest_1.MessageClassRest(this.client, this.raw.d);
            message.author = yield this.client.userResource.fetch(message.author.id);
            this.messages.set(message.id, new context_1.Context(this.client, message));
            this.client.emit('newMessage', new context_1.Context(this.client, message));
        });
    }
    onEdit() {
        const message = new messageClassRest_1.MessageClassRest(this.client, this.raw.d);
        const oldMessage = this.messages.get(message.id);
        if (message.editedTimestamp !== null && oldMessage) {
            message.oldContent = oldMessage.content;
            this.messages.set(message.id, Object.assign(Object.assign({}, oldMessage), message));
        }
        else {
            this.messages.set(message.id, new context_1.Context(this.client, message));
        }
        this.client.emit('updateMessage', oldMessage, new context_1.Context(this.client, message));
    }
    onDelete() {
        const oldMessage = this.messages.get(this.raw.d.id);
        this.messages.delete(oldMessage.id);
        this.client.emit('deletedMessage', oldMessage);
    }
}
exports.MessageEvent = MessageEvent;
exports.default = MessageEvent;
