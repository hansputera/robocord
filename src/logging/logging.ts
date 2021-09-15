import { writeToPath } from "@fast-csv/format";
import { parseFile } from "@fast-csv/parse";
import { existsSync, mkdirSync } from "fs";
import path from "path";
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
        if (!existsSync(this.directory)) {
            mkdirSync(this.directory);
        };
        if (!exceptionName) console.log(message);
    }
    private get path() {
        return path.resolve(this.directory, `${this.dateFormat}.csv`);
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
            if (existsSync(this.path)) {
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
    public generate(): void {
        this.generateRows().then(rows => {
            writeToPath(this.path, rows).on('error', console.error);
        });
    }
}