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
exports.GuildResource = void 0;
const guild_1 = require("../../base/guild");
const guild_2 = require("../../client/events/guild");
class GuildResource {
    constructor(rest) {
        this.rest = rest;
        /**
         * Guilds cache
         */
        this.guilds = guild_2.guildCaches;
    }
    fetch(guildID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.guilds.has(guildID))
                return this.guilds.get(guildID);
            try {
                const response = this.rest.api.get(`guilds/${guildID}`);
                return (yield response.json());
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    create(name, options) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = this.rest.api.post('guilds', {
                    json: Object.assign({ name }, options),
                });
                return new guild_1.GuildClass((yield response.json()));
            }
            catch (_a) {
                return false;
            }
        });
    }
    getPreview(guildID) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = this.rest.api.get('guilds/' + guildID + '/preview');
                return (yield response.json());
            }
            catch (_a) {
                return undefined;
            }
        });
    }
}
exports.GuildResource = GuildResource;
