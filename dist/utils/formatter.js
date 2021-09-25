"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Formatter = void 0;
class Formatter {
    static exceptionDateFile(date) {
        return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
    }
}
exports.Formatter = Formatter;
