import dayjs from 'dayjs';
import { ILogger } from '../../domain/interfaces/logger';

class AggregateLogger implements ILogger {
  private loggers: ILogger[];

  constructor(loggers: ILogger[]) {
    this.loggers = loggers;
  }

  public log(message: string): void {
    const date = dayjs().format('DD-MM-YYYY HH:mm:ss');
    this.loggers.forEach((logger) => {
      logger.log(`${date} [LOG] ${message}`);
    });
  }

  public error(message: string): void {
    const date = dayjs().format('DD-MM-YYYY HH:mm:ss');
    this.loggers.forEach((logger) => {
      logger.error(`${date} [ERROR] ${message}`);
    });
  }
}

export { AggregateLogger };
