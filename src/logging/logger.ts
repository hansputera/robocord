import chalk from "chalk";
import { Logging } from "./logging";

export class Logger {
    constructor(
        private readonly serviceName: string
    ) {};

    private getLogging = (message: string) => new Logging(this.serviceName, message);
    private getFormattedMessage = (message: string) => `[${this.serviceName}] - ${message}`;

    log(message: string) {
        console.log(this.getFormattedMessage(message));
        this.getLogging(message).generate();
    }

    info(message: string) {
        console.log(chalk.cyan(this.getFormattedMessage(message)));
        this.getLogging(message).generate();
    }

    error(err: Error) {
        console.log(chalk.red(this.getFormattedMessage(err.message)));
        this.getLogging(err.message).generate();
    }

    fatal(message: string) {
        console.log(chalk.red(this.getFormattedMessage(message)));
        this.getLogging(message).generate();
    }

    warn(message: string) {
        console.log(chalk.yellow(this.getFormattedMessage(message)));
        this.getLogging(message).generate();
    }

    success(message: string) {
        console.log(chalk.green(this.getFormattedMessage(message)));
        this.getLogging(message).generate();
    }
}