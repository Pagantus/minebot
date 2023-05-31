import { ITask } from '../base';

class TaskRetry<TInput, TOutput> implements ITask<TInput, TOutput> {
  private task: ITask<TInput, TOutput>;
  private maxRetries: number;
  private retries: number;
  private isStopped: boolean;

  constructor(task: ITask<TInput, TOutput>, maxRetries: number = 3) {
    this.task = task;
    this.maxRetries = maxRetries;
    this.retries = 0;
    this.isStopped = false;
  }

  public async run(input: TInput): Promise<TOutput> {
    let output: TOutput;

    while (this.retries < this.maxRetries && !this.isStopped) {
      try {
        output = await this.task.run(input);
        break;
      } catch (error) {
        this.retries++;

        if (this.retries >= this.maxRetries) {
          throw new Error(`Работа не была выполнена после ${this.maxRetries} попыток`);
        }

        await new Promise((res) => setTimeout(res, 1000));
      }
    }

    return output!;
  }

  public async stop(): Promise<void> {
    this.isStopped = true;
    await this.task.stop();
  }

  public async resume(input: TInput): Promise<TOutput> {
    return this.run(input);
  }
}

export { TaskRetry };
