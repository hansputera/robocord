import { writeToPath } from "@fast-csv/format";
import { parseFile } from "@fast-csv/parse";
import { exists, existsSync, mkdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { Util } from "../utils";

export type LoggingRow = {
    date: string;
    service: string;
    message: string;
    exceptionName?: string;
};

export class Logging {
    private _date = new Date();
    private dateFormat = Util.formatter.exceptionDateFile(this._date);
    private directory = path.resolve(__dirname, '..', 'logs', this.service);

    constructor(private readonly service: string = 'system', private readonly message?: string, private readonly exceptionName?: string) {
        if (!existsSync(path.resolve(__dirname, '..', 'logs'))) mkdirSync(path.resolve(__dirname, '..', 'logs'));
        if (!existsSync(this.directory)) {
            mkdirSync(this.directory);
        };
    }
    private get path() {
        return path.resolve(this.directory, `${this.dateFormat}.csv`);
    }

    private isExist() {
        try {
            if (existsSync(this.path)) {
                const content = readFileSync(this.path, {encoding: 'utf-8'});
                if (content.trim().length) return true;
                else return false;
            } else {
                return false;
            }
        } catch {
            return false;
        }
    }

    private async generateRows(): Promise<LoggingRow[]> {
        const rows: LoggingRow[] = [
            {
                date: 'date',
                service: 'service',
                message: 'message',
                exceptionName: 'exceptionName',
            }
        ];
        return await new Promise((resolve) => {
            if (this.isExist()) {
                parseFile(this.path, {
                    'headers': ['date', 'service', 'message', 'exceptionName'],
                    'skipRows': 1,
                }).on('data', (chunk) => {
                    rows.push(chunk);
                }).on('end', () => {
                    rows.push({
                        date: this._date.toISOString(),
                        service: this.service,
                        message: this.message,
                        exceptionName: this.exceptionName ? this.exceptionName : 'none',
                    });
                    resolve(rows);
                });
            } else {
                rows.push({
                    date: this._date.toISOString(),
                    service: this.service,
                    message: this.message,
                    exceptionName: this.exceptionName ? this.exceptionName : 'none',
                });
                resolve(rows);
            }
        });
    }
    public async generate() {
        const rows = await this.generateRows();
        writeToPath(this.directory, rows).on('error', console.error);
    }
}