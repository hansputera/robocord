"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoaderEvent = void 0;
const fs_1 = require("fs");
const path_1 = __importDefault(require("path"));
const cache_1 = require("../../services/cache");
class LoaderEvent {
    constructor() {
        this.blacklistFiles = ['loader'];
        this._events = new cache_1.CacheService({
            ttl: 60 * 30 * 1000,
            max: 100,
            clock: Date,
        });
    }
    runEvent(_event, methodName, args) {
        try {
            eval(`_event.${methodName}(${args ? args.join(', ') : ''});`);
            return true;
        }
        catch (e) {
            console.error(e);
            return false;
        }
    }
    loadEvent(eventName) {
        const location = path_1.default.resolve(__dirname, eventName);
        try {
            const ev = new (require(location).default)();
            return ev;
        }
        catch (_a) {
            return undefined;
        }
    }
    searchEvent(t) {
        const temp_event = [];
        this._events.toArray().forEach((event) => {
            if (Array.isArray(t)) {
                t.forEach((evt) => {
                    const eventName = event.eventRequired.find((x) => x[0] === evt);
                    if (eventName)
                        temp_event.push(event);
                });
            }
            else {
                const eventName = event.eventRequired.find((x) => x[0] === t);
                if (eventName)
                    temp_event.push(event);
            }
        });
        return [...new Set(temp_event)]; // prevent duplicates event.
    }
    load() {
        if (this._events.toArray().length)
            this._events.flush();
        const files = (0, fs_1.readdirSync)(path_1.default.resolve(__dirname));
        files
            .filter((fl) => !(0, fs_1.statSync)(path_1.default.resolve(__dirname, fl)).isDirectory() &&
            !this.blacklistFiles.includes(fl.split('.').at(0)))
            .forEach((file) => {
            if (require(path_1.default.resolve(__dirname, file)).default) {
                const fl = new (require(path_1.default.resolve(__dirname, file)).default)();
                const name = file.split('.').at(0);
                fl.name = name;
                this._events.set(name, fl);
            }
        });
    }
}
exports.LoaderEvent = LoaderEvent;
