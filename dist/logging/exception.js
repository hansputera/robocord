"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionLogging = void 0;
const logging_1 = require("./logging");
class ExceptionLogging extends logging_1.Logging {
    constructor(exception) {
        super('exception', exception.message, exception.getExceptionName());
        this.exception = exception;
    }
}
exports.ExceptionLogging = ExceptionLogging;
