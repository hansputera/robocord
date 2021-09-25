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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestClient = void 0;
const got_1 = __importDefault(require("got"));
const logger_1 = require("../logging/logger");
class RestClient {
    constructor(apiVersion, token) {
        this.apiVersion = apiVersion;
        this.token = token;
        this._logger = new logger_1.Logger('Rest');
        this.baseURL = 'discord.com';
        this.api = got_1.default.extend({
            prefixUrl: this.prefixUrl,
            headers: {
                Authorization: `Bot ${this.token}`,
            },
        });
    }
    get prefixUrl() {
        return `https://${this.baseURL}/api/v${this.apiVersion}`;
    }
    getGateway() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = this.api.get('gateway/bot');
                const json = yield response.json();
                return json;
            }
            catch (e) {
                this._logger.error(e);
                return undefined;
            }
        });
    }
}
exports.RestClient = RestClient;
