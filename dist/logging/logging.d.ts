export declare type LoggingRow = {
    date: string;
    service: string;
    message: string;
    exceptionName?: string;
};
export declare class Logging {
    private readonly service;
    private readonly message?;
    private readonly exceptionName?;
    private _date;
    private dateFormat;
    private directory;
    constructor(service?: string, message?: string, exceptionName?: string);
    private get path();
    private isExist;
    private generateRows;
    generate(): Promise<void>;
}
