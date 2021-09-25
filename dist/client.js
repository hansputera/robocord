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
exports.Client = exports.loggerClient = void 0;
const websocket_1 = require("./client/websocket");
const logger_1 = require("./logging/logger");
const rest_1 = require("./rest/rest");
const utils_1 = require("./utils");
const tiny_typed_emitter_1 = require("tiny-typed-emitter");
const resources_1 = require("./rest/resources");
const users_cache_1 = require("./services/users.cache");
const guild_1 = require("./client/events/guild");
const optionsBuilder = (ops) => {
    if (!ops)
        ops = {
            allowedMentions: [],
            logging: undefined,
            intents: [],
            ws: {
                properties: {
                    $os: 'Linux',
                    $browser: 'Discord Linux',
                    $device: 'Linux',
                },
                v: 9,
            },
        };
    else if (!ops.ws)
        ops.ws = {
            properties: {
                $os: 'Linux',
                $browser: 'Discord Linux',
                $device: 'Linux',
            },
            v: 9,
        };
    return ops;
};
class Client extends tiny_typed_emitter_1.TypedEmitter {
    constructor(token, options) {
        super();
        this.token = token;
        this.options = options;
        this.ws = new websocket_1.RZRWebSocket(this, this.token, this.options ? this.options.intents : [utils_1.Util.intents.GUILD], optionsBuilder(this.options).ws);
        this._rest = new rest_1.RestClient(this.options.ws.v, this.token);
        this.getGateway = this._rest.getGateway;
        this.guildResource = new resources_1.GuildResource(this._rest);
        this.userResource = new resources_1.UserResource(this._rest);
        this.caches = {
            user: users_cache_1.userCaches,
            guild: guild_1.guildCaches,
        };
        this.options = optionsBuilder(options);
        utils_1.Util.globalStore.set('_logFile', this.options.logging);
        exports.loggerClient = new logger_1.Logger('Client');
        if (options.logging)
            exports.loggerClient.info('Starting ...');
    }
    run() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.options.logging)
                exports.loggerClient.warn('Connecting');
            return yield new Promise((resolve, reject) => {
                this._rest.getGateway().then((g) => {
                    if (g) {
                        exports.loggerClient.success('Token valid');
                        this.ws.connect();
                        resolve(null);
                    }
                    else {
                        exports.loggerClient.fatal('Token invalid');
                        reject(null);
                    }
                });
            });
        });
    }
    getOptions() {
        return this.options;
    }
}
exports.Client = Client;
