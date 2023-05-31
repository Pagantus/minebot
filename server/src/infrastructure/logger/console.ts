import { ILogger } from '../../domain/interfaces/logger';

class ConsoleLogger implements ILogger {
  public log(message: string): void {
    console.log(message);
  }

  public error(message: string): void {
    console.error(message);
  }
}

export { ConsoleLogger };
