"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const chalk_1 = __importDefault(require("chalk"));
const logging_1 = require("./logging");
class Logger {
    constructor(serviceName) {
        this.serviceName = serviceName;
        this.getLogging = (message) => new logging_1.Logging(this.serviceName, message);
        this.getFormattedMessage = (message) => `[${this.serviceName}] - ${message}`;
    }
    log(message) {
        console.log(this.getFormattedMessage(message));
        this.getLogging(message).generate();
    }
    info(message) {
        console.log(chalk_1.default.cyan(this.getFormattedMessage(message)));
        this.getLogging(message).generate();
    }
    error(err) {
        console.log(chalk_1.default.red(this.getFormattedMessage(err.message)));
        this.getLogging(err.message).generate();
    }
    fatal(message) {
        console.log(chalk_1.default.red(this.getFormattedMessage(message)));
        this.getLogging(message).generate();
    }
    warn(message) {
        console.log(chalk_1.default.yellow(this.getFormattedMessage(message)));
        this.getLogging(message).generate();
    }
    success(message) {
        console.log(chalk_1.default.green(this.getFormattedMessage(message)));
        this.getLogging(message).generate();
    }
}
exports.Logger = Logger;
