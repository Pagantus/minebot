import { promises as fs } from 'fs';
import { ILogger } from '../../domain/interfaces/logger';

class FileLogger implements ILogger {
  private filePath: string;
  private buffer: string[];
  private flushInterval: number;

  constructor(filePath: string, flushInterval: number = 60000) {
    this.filePath = filePath;
    this.buffer = [];
    this.flushInterval = flushInterval;
    setInterval(() => this.flush(), this.flushInterval);
  }

  public log(message: string): void {
    this.buffer.push(message);
  }

  public error(message: string): void {
    this.buffer.push(message);
  }

  private async flush(): Promise<void> {
    if (this.buffer.length === 0) {
      return;
    }

    const messagesToWrite = this.buffer.join('\n') + '\n';
    this.buffer = [];

    try {
      await fs.appendFile(this.filePath, messagesToWrite);
    } catch (err) {
      console.error('Failed to write to log file:', err);
    }
  }
}

export { FileLogger };
