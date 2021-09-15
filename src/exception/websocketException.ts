import { Exception } from "./exception";

export class WebSocketException extends Exception {
    constructor(message: string, readonly code?: number) {
        super('WebSocketException', message, {
            code
        });

        this.message = `${this.message}, WSCODE: ${code}`;
    }

    public getCode(): number {
        return this.getFull().data?.code as number;
    }
}