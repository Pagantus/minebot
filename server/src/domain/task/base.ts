import { TBot } from '../bot/base';

interface ITask<TInput, TOutput> {
  run(input: TInput): Promise<TOutput>;
  stop(): Promise<void>;
  resume(input: TInput): Promise<TOutput>;
}

abstract class Task<TInput, TOutput> implements ITask<TInput, TOutput> {
  protected isStopped: boolean;
  protected bot: TBot;

  constructor(bot: TBot) {
    this.isStopped = false;
    this.bot = bot;
  }

  public async run(input: TInput): Promise<TOutput> {
    return this.start(input);
  }

  protected abstract start(input: TInput): Promise<TOutput>;

  public async stop(): Promise<void> {
    this.isStopped = true;
  }

  public async resume(input: TInput): Promise<TOutput> {
    return this.start(input);
  }
}

export type { ITask };
export { Task };
