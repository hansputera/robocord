"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
const exception_1 = require("../logging/exception");
class Exception extends Error {
    constructor(exceptionName, message, data) {
        super(`[${exceptionName}] - ${message}`);
        this.exceptionName = exceptionName;
        this.data = data;
        this._date = Date.now();
        this.message = `[${exceptionName}] - ${message}`;
        this._logger = new exception_1.ExceptionLogging(this);
    }
    getLogger() {
        return this._logger;
    }
    getDate() {
        return new Date(this._date);
    }
    getFull() {
        return {
            exceptionName: this.exceptionName,
            message: this.message,
            data: this.data,
        };
    }
    getExceptionName() {
        return this.exceptionName;
    }
}
exports.Exception = Exception;
