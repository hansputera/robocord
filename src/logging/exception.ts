import type { Exception } from '../exception/exception';
import { Logging } from './logging';

export class ExceptionLogging extends Logging {
  constructor(readonly exception: Exception) {
    super('exception', exception.message, exception.getExceptionName());
  }
}
