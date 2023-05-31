import { IProcess } from '../base';

class ProcessDispatcher<TInput> implements IProcess<TInput[]> {
  private process: IProcess<TInput>;
  private currentIndex: number;
  private isStopped: boolean;
  private inputs: TInput[];

  constructor(process: IProcess<TInput>) {
    this.process = process;
    this.currentIndex = 0;
    this.isStopped = false;
    this.inputs = [];
  }

  public async run(inputs: TInput[]): Promise<void> {
    this.inputs = inputs;
    this.currentIndex = 0;
    this.isStopped = false;

    return this.executeTasks();
  }

  public async stop(): Promise<void> {
    this.isStopped = true;
  }

  public async resume(): Promise<void> {
    if (!this.isStopped) {
      throw new Error('TaskDispatcher is not stopped');
    }

    this.isStopped = false;
    return this.executeTasks();
  }

  private async executeTasks(): Promise<void> {
    while (this.currentIndex < this.inputs.length && !this.isStopped) {
      await this.process.run(this.inputs[this.currentIndex]);
      this.currentIndex++;
    }
  }
}

export { ProcessDispatcher };
