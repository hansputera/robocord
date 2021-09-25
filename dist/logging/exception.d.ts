import type { Exception } from '../exception/exception';
import { Logging } from './logging';
export declare class ExceptionLogging extends Logging {
    readonly exception: Exception;
    constructor(exception: Exception);
}
