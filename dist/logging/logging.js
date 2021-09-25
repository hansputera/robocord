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
exports.Logging = void 0;
const format_1 = require("@fast-csv/format");
const parse_1 = require("@fast-csv/parse");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const utils_1 = require("../utils");
class Logging {
    constructor(service = 'system', message, exceptionName) {
        this.service = service;
        this.message = message;
        this.exceptionName = exceptionName;
        this._date = new Date();
        this.dateFormat = utils_1.Util.formatter.exceptionDateFile(this._date);
        this.directory = utils_1.Util.globalStore.get('_logFile')
            ? node_path_1.default.resolve(utils_1.Util.globalStore.get('_logFile'))
            : node_path_1.default.resolve(__dirname, '..', 'logs');
        if (!(0, node_fs_1.existsSync)(this.directory))
            (0, node_fs_1.mkdirSync)(this.directory);
    }
    get path() {
        return node_path_1.default.resolve(this.directory, `${this.service}__${this.dateFormat}.csv`);
    }
    isExist() {
        try {
            if (!(0, node_fs_1.readFileSync)(this.path, 'utf-8')) {
                const content = (0, node_fs_1.readFileSync)(this.path, { encoding: 'utf-8' });
                if (content.trim().length)
                    return true;
                else
                    return false;
            }
            else
                return false;
        }
        catch (_a) {
            return false;
        }
    }
    generateRows() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = [
                {
                    date: 'date',
                    service: 'service',
                    message: 'message',
                    exceptionName: 'exceptionName',
                },
            ];
            return yield new Promise((resolve) => {
                if (this.isExist()) {
                    (0, parse_1.parseFile)(this.path, {
                        headers: ['date', 'service', 'message', 'exceptionName'],
                        skipRows: 1,
                    })
                        .on('data', (chunk) => {
                        rows.push(chunk);
                    })
                        .on('end', () => {
                        rows.push({
                            date: this._date.toISOString(),
                            service: this.service,
                            message: this.message,
                            exceptionName: this.exceptionName ? this.exceptionName : 'none',
                        });
                        resolve(rows);
                    });
                }
                else {
                    rows.push({
                        date: this._date.toISOString(),
                        service: this.service,
                        message: this.message,
                        exceptionName: this.exceptionName ? this.exceptionName : 'none',
                    });
                    resolve(rows);
                }
            });
        });
    }
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            const rows = yield this.generateRows();
            (0, format_1.writeToPath)(this.path, rows).on('error', console.error);
        });
    }
}
exports.Logging = Logging;
