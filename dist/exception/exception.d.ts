import { ExceptionLogging } from '../logging/exception';
export interface ExceptionFull {
    exceptionName: string;
    message: string;
    data?: Record<string, unknown>;
}
export declare class Exception extends Error {
    private readonly exceptionName;
    private readonly data?;
    private _date;
    private _logger;
    constructor(exceptionName: string, message: string, data?: unknown);
    getLogger(): ExceptionLogging;
    getDate(): Date;
    getFull(): ExceptionFull;
    getExceptionName(): string;
}
