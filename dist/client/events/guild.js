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
exports.GuildEvent = exports.guildCaches = exports.GuildClassRest = void 0;
const guild_1 = require("../../base/guild");
const user_1 = require("../../base/user");
const cache_1 = require("../../services/cache");
const baseEvent_1 = require("../baseEvent");
class GuildClassRest extends guild_1.GuildClass {
    constructor(client, guild) {
        super(guild);
        this.client = client;
        this._guild = guild;
    }
    getOwner() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.client.userResource.fetch(this._guild.owner_id);
        });
    }
}
exports.GuildClassRest = GuildClassRest;
exports.guildCaches = new cache_1.CacheService({
    ttl: 60 * 60 * 1000,
    max: Infinity,
    clock: Date,
});
class GuildEvent extends baseEvent_1.BaseEvent {
    constructor() {
        super(...arguments);
        this.eventRequired = [
            ['GUILD_CREATE', this.onCreate.name],
            ['GUILD_UPDATE', this.onUpdate.name],
            ['GUILD_DELETE', this.onLeave.name],
            ['GUILD_BAN_ADD', this.onBanAdd.name],
            ['GUILD_BAN_REMOVE', this.onBanRemove.name],
        ];
    }
    onCreate(isStarted = false) {
        const guild = new GuildClassRest(this.client, this.raw.d);
        exports.guildCaches.set(guild.id, guild);
        if (!isStarted)
            this.client.emit('newGuild', guild);
        else
            this.client.emit('ready');
    }
    onLeave() {
        const guild = exports.guildCaches.get(this.raw.d.id);
        exports.guildCaches.delete(guild.id);
        this.client.emit('leaveGuild', guild);
    }
    onUpdate() {
        const guild = new GuildClassRest(this.client, this.raw.d);
        const oldGuild = exports.guildCaches.get(guild.id);
        this.client.emit('updateGuild', oldGuild, guild);
    }
    onBanAdd() {
        const bannedUser = new user_1.UserClass(this.raw.d.user);
        const guild = exports.guildCaches.get(this.raw.d.guild_id);
        this.client.emit('banAdd', guild, bannedUser);
    }
    onBanRemove() {
        const bannedUser = new user_1.UserClass(this.raw.d.user);
        const guild = exports.guildCaches.get(this.raw.d.guild_id);
        this.client.emit('banDelete', guild, bannedUser);
    }
}
exports.GuildEvent = GuildEvent;
exports.default = GuildEvent;
