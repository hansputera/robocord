"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseEvent = void 0;
class BaseEvent {
    constructor() {
        this.name = '';
        this.eventRequired = [];
    }
    setRaw(raw) {
        this.raw = raw;
    }
    setClient(client) {
        this.client = client;
    }
}
exports.BaseEvent = BaseEvent;
