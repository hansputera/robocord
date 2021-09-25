"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RZRWebSocket = void 0;
const ws_1 = __importDefault(require("ws"));
const url_1 = require("url");
const exception_1 = require("../exception/exception");
const utils_1 = require("../utils");
const clientUser_1 = require("../base/clientUser");
const loader_1 = require("./events/loader");
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const erlpack_1 = __importStar(require("@yukikaze-bot/erlpack"));
const fast_zlib_1 = __importDefault(require("fast-zlib"));
class RZRWebSocket {
    /**
     *
     * @param token - Discord bot token
     * @param options - Websocket options
     */
    constructor(client, token, intents = [], options) {
        this.client = client;
        this.token = token;
        this.intents = intents;
        this.options = options;
        this.connectionType = 'offline';
        this.gateway = 'gateway.discord.gg';
        this.encodedOptions = new url_1.URLSearchParams({
            v: this.options ? (this.options.v ? this.options.v.toString() : '9') : '9',
            encoding: 'etf',
            compress: 'zlib-stream',
        });
        this.gatewayType = 'wss';
        this.inflate = new fast_zlib_1.default.Inflate();
        this.session = '';
        this.identifyProperties = {
            $os: this.options.properties.$os ? this.options.properties.$os : 'Linux',
            $browser: this.options.properties.$browser
                ? this.options.properties.$browser
                : 'Discord Linux',
            $device: this.options.properties.$device
                ? this.options.properties.$device
                : 'Linux',
        };
        this.intentss = 0;
        this.loader = new loader_1.LoaderEvent();
        if ((0, fs_1.existsSync)(path_1.default.resolve(client.getOptions().sessionFile))) {
            const context = (0, fs_1.readFileSync)(path_1.default.resolve(client.getOptions().sessionFile), {
                encoding: 'utf-8',
            });
            if (context.trim().length) {
                this.session = context.trim();
            }
        }
        intents.forEach((intent) => {
            this.intentss += intent;
        });
        this.loader.load();
    }
    resume(emitted = true) {
        if (!this.session.length)
            throw new exception_1.Exception('INVALID_SESSION', 'Websocket session token is empty');
        this.connectionType = 'reconnecting';
        if (emitted)
            this.client.emit('reconnect');
        this.ws = new ws_1.default(this.gatewayUrl);
        this.handle(this.ws);
    }
    connect() {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            throw new exception_1.Exception('WEBSOCKET_ALREADY_CONNECTED', 'Websocket is already connected');
        }
        else if (this.ws) {
            this.resume();
        }
        else {
            this.connectionType = 'connecting';
            this.ws = new ws_1.default(this.gatewayUrl);
            this.handle(this.ws);
        }
    }
    handle(ws) {
        ws.on('open', () => {
            if (!this.session.length) {
                this.connectionType = 'connecting';
                this.send(utils_1.Util.opcodes.gateway.IDENTIFY, {
                    token: this.token,
                    intents: this.intentss,
                    properties: this.identifyProperties,
                });
            }
            else {
                this.connectionType = 'reconnecting';
                this.send(utils_1.Util.opcodes.gateway.RESUME, {
                    token: this.token,
                    session_id: this.session,
                    seq: 1337,
                });
            }
        })
            .on('close', (code, reason) => {
            const uncompressReason = this.inflate.process(reason);
            this.connectionType = 'offline';
            this.client.emit('close', code, uncompressReason && uncompressReason.toString('utf8'));
            this.resume(code !== 12345);
        })
            .on('message', (ch) => this.handleRaw(ch))
            .on('error', (err) => this.client.emit('error', err));
    }
    send(opcode, payload, eventName, sequenceNumber) {
        const additional = {};
        if (eventName)
            additional['t'] = eventName;
        if (sequenceNumber)
            additional['s'] = sequenceNumber;
        if (this.ws) {
            const data = {
                op: opcode,
                d: Object.assign(Object.assign({}, payload), additional),
            };
            const packed = (0, erlpack_1.default)(data);
            this.ws.send(packed);
        }
        else {
            throw new exception_1.Exception('WEBSOCKET_OFFLINE', "Websocket not connected, couldn't send anything to discord");
        }
    }
    handleRaw(data) {
        try {
            const uncompressed = this.inflate.process(data);
            const unpacked = (0, erlpack_1.unpack)(uncompressed);
            const parses = {
                op: unpacked.op,
                s: unpacked.s,
                d: unpacked.d,
                t: unpacked.t,
            };
            this.client.emit('raw', parses);
            if (parses.t === 'READY') {
                this.connectionType = 'connected';
                this.client.user = new clientUser_1.ClientUser(this.client, parses.d.user);
                this.startedConnect = new Date().getTime();
                if ((0, fs_1.existsSync)(path_1.default.resolve(this.client.getOptions().sessionFile)))
                    (0, fs_1.writeFileSync)(path_1.default.resolve(this.client.getOptions().sessionFile), parses.d.session_id);
                this.session = parses.d.session_id;
            }
            else if (parses.op === utils_1.Util.opcodes.gateway.INVALID_SESSION) {
                this.connectionType = 'offline';
                this.session = '';
                this.ws = undefined;
                this.client.getOptions().sessionFile &&
                    (0, fs_1.writeFileSync)(path_1.default.resolve(this.client.getOptions().sessionFile), this.session);
                this.connect();
            }
            else if (parses.t === 'RESUMED' && !this.client.user) {
                this.connectionType = 'connected';
                this.client.userResource.getMe().then((user) => {
                    if (user) {
                        this.client.user = new clientUser_1.ClientUser(this.client, user);
                    }
                });
                this.startedConnect = new Date().getTime();
            }
            else {
                const events = this.loader.searchEvent(parses.t);
                if (events.length) {
                    events.forEach((event) => {
                        const diffSeconds = (new Date().getTime() - this.startedConnect) / 1000;
                        event.setClient(this.client);
                        event.setRaw(parses);
                        const action = event.eventRequired.find((e) => e[0] === parses.t)[0];
                        this.loader.runEvent(event, action, [diffSeconds < 2]);
                    });
                }
            }
        }
        catch (err) {
            if (err.code === 'Z_DATA_ERROR') {
                this.ws.close(12345);
            }
        }
    }
    getUptime() {
        return new Date().getTime() - this.startedConnect;
    }
    getStatusConnection() {
        return this.connectionType;
    }
    isConnected() {
        if (this.ws && this.ws.readyState === ws_1.default.OPEN) {
            return true;
        }
        else {
            return false;
        }
    }
    get gatewayUrl() {
        return `${this.gatewayType}://${this.gateway}?${this.encodedOptions}`;
    }
}
exports.RZRWebSocket = RZRWebSocket;
process.on('uncaughtException', () => { });
