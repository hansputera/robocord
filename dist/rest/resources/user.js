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
exports.UserResource = void 0;
const user_1 = require("../../base/user");
const users_cache_1 = require("../../services/users.cache");
class UserResource {
    constructor(rest) {
        this.rest = rest;
        /**
         * Guilds cache
         */
        this.users = users_cache_1.userCaches;
    }
    getMe() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = this.rest.api.get('users/@me');
                const json = yield response.json();
                return new user_1.UserClass(json);
            }
            catch (_a) {
                return undefined;
            }
        });
    }
    fetch(userID) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.users.has(userID))
                return this.users.get(userID);
            try {
                const response = this.rest.api.get(`users/${userID}`);
                const json = yield response.json();
                return new user_1.UserClass(json);
            }
            catch (_a) {
                return undefined;
            }
        });
    }
}
exports.UserResource = UserResource;
