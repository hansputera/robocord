export interface ExceptionFull {
    exceptionName: string;
    message: string;
    data?: Record<string, unknown>;
}

export class Exception extends Error {
    private _date = Date.now();
    constructor(private readonly exceptionName: string, message: string, private readonly data?: unknown) {
        super(
            `[${exceptionName}] - ${message}`
        );

        this.message = `[${exceptionName}] - ${message}`;
    }
    public getDate(): Date {
        return new Date(this._date);
    }
    public getFull(): ExceptionFull {
        return {
            exceptionName: this.exceptionName,
            message: this.message,
            data: this.data as Record<string, unknown>
        };
    }
    public getExceptionName(): string {
        return this.exceptionName;
    }
}