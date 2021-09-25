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
exports.ClientUser = exports.convertActivityType = void 0;
const utils_1 = require("../utils");
const user_1 = require("./user");
const fillActivityOption = (options) => {
    if (!options || (options && !options.name && !options.type))
        options = {
            name: 'Robocord',
            type: 'PLAYING',
        };
    else if (!options.name)
        options.name = 'Robocord';
    else if (!options.type)
        options.type = 'PLAYING';
    return options;
};
const convertActivityType = (activity) => {
    switch (activity) {
        case 'PLAYING':
            return 0;
        case 'STREAMING':
            return 1;
        case 'LISTENING':
            return 2;
        case 'WATCHING':
            return 3;
        case 'CUSTOM':
            return 4;
        case 'COMPETING':
            return 5;
        default:
            return 0;
    }
};
exports.convertActivityType = convertActivityType;
class ClientUser extends user_1.UserClass {
    constructor(client, user) {
        super(user);
        this.client = client;
        this._presenceOptions = {
            status: 'online',
            activity: {
                name: 'Robocord',
                type: 'PLAYING',
            },
        };
        this.api = user;
    }
    getPresences() {
        return this._presenceOptions;
    }
    setUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            if (username.toLowerCase() === this.api.username.toLowerCase())
                return false;
            try {
                const response = this.client._rest.api.patch('users/@me', {
                    json: {
                        username: username,
                    },
                });
                const result = yield response.json();
                if (result && typeof result === 'object')
                    return true;
                else
                    return false;
            }
            catch (_a) {
                return false;
            }
        });
    }
    setAsDefaultActivity() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.setActivity(this._presenceOptions.status, this._presenceOptions.activity);
        });
    }
    setActivity(status, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const filled = fillActivityOption(options);
            this._presenceOptions = {
                status,
                activity: filled,
            };
            const object = {
                status,
                activities: [
                    {
                        name: filled.name,
                        type: (0, exports.convertActivityType)(filled.type),
                        url: filled.url,
                    },
                ],
                since: status === 'idle' ? Date.now() : 0,
                afk: false,
            };
            this.client.ws.send(utils_1.Util.opcodes.gateway.PRESENCE_UPDATE, object);
        });
    }
}
exports.ClientUser = ClientUser;
