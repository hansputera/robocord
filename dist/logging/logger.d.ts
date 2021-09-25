export declare class Logger {
    private readonly serviceName;
    constructor(serviceName: string);
    private getLogging;
    private getFormattedMessage;
    log(message: string): void;
    info(message: string): void;
    error(err: Error): void;
    fatal(message: string): void;
    warn(message: string): void;
    success(message: string): void;
}
