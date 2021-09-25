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
exports.ChannelResource = void 0;
const channels_cache_1 = require("../../services/channels.cache");
class ChannelResource {
    constructor(rest) {
        this.rest = rest;
        this.channels = channels_cache_1.channelCache;
    }
    fetch(channelID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.channels.has(channelID))
                return this.channels.get(channelID);
            try {
                const response = this.rest.api.get('channels/' + channelID);
                return (yield response.json());
            }
            catch (_a) {
                return undefined;
            }
        });
    }
}
exports.ChannelResource = ChannelResource;
