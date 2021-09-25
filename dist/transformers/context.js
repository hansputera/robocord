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
exports.Context = void 0;
const messageClassRest_1 = require("../client/events/items/messageClassRest");
class Context extends messageClassRest_1.MessageClassRest {
    constructor(client, msg) {
        super(client, msg.api);
        this._client = client;
    }
    /**
     * Carefull when use it.
     *
     * @param options - API Send Message Options
     */
    sendAPI(options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = this._client._rest.api.post('channels/' + this.channelID + '/messages', {
                    json: Object.assign({ allowed_mentions: this._client.getOptions().allowedMentions }, options),
                });
                return new Context(this._client, new messageClassRest_1.MessageClassRest(this._client, (yield resp.json())));
            }
            catch (err) {
                this._client.emit('error', err);
                console.error(err);
                return undefined;
            }
        });
    }
    edit(content, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.author.id !== this._client.user.id)
                return undefined;
            try {
                const resp = this._client._rest.api.patch('channels/' + this.channelID + '/messages/' + this.id, {
                    json: Object.assign({ allowed_mentions: this._client.getOptions().allowedMentions, content }, options),
                });
                const json = yield resp.json();
                return new Context(this._client, new messageClassRest_1.MessageClassRest(this._client, json));
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    sendEmbeds(embed) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendAPI({
                embeds: Array.isArray(embed) ? embed : [embed],
            });
            return response;
        });
    }
    _delete() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.author.id != this._client.user.id)
                return undefined;
            try {
                yield this._client._rest.api.delete('channels/' + this.channelID + '/messages/' + this.id);
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    delete(after = 0) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!after)
                yield this._delete();
            else
                setTimeout(() => this.delete(), after);
        });
    }
    send(text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendAPI(Object.assign({ content: text }, options));
            return response;
        });
    }
    reply(text, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield this.sendAPI(Object.assign({ message_reference: {
                    message_id: this.id,
                    channel_id: this.channelID,
                    guild_id: this.guildID,
                }, content: text }, options));
            return response;
        });
    }
}
exports.Context = Context;
