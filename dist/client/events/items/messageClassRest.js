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
exports.MessageClassRest = void 0;
const message_1 = require("../../../base/message");
class MessageClassRest extends message_1.MessageClass {
    constructor(client, msg) {
        super(msg);
        this.client = client;
        this.api = msg;
    }
    getGuild() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.guildResource.fetch(this.guildID);
        });
    }
}
exports.MessageClassRest = MessageClassRest;
