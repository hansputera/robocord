import { ExceptionLogging } from '../logging/exception';

export interface ExceptionFull {
  exceptionName: string;
  message: string;
  data?: Record<string, unknown>;
}

export class Exception extends Error {
  private _date = Date.now();
  private _logger: ExceptionLogging;

  constructor(
    private readonly exceptionName: string,
    message: string,
    private readonly data?: unknown
  ) {
    super(`[${exceptionName}] - ${message}`);

    this.message = `[${exceptionName}] - ${message}`;
    this._logger = new ExceptionLogging(this);
  }
  public getLogger(): ExceptionLogging {
    return this._logger;
  }
  public getDate(): Date {
    return new Date(this._date);
  }
  public getFull(): ExceptionFull {
    return {
      exceptionName: this.exceptionName,
      message: this.message,
      data: this.data as Record<string, unknown>,
    };
  }
  public getExceptionName(): string {
    return this.exceptionName;
  }
}
