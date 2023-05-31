import { ITask } from '../base';

class TaskDispatcher<TInput, TOutput> implements ITask<TInput[], TOutput[]> {
  private task: ITask<TInput, TOutput>;
  private currentIndex: number;
  private isStopped: boolean;
  private inputs: TInput[];
  private outputs: TOutput[];

  constructor(task: ITask<TInput, TOutput>) {
    this.task = task;
    this.currentIndex = 0;
    this.isStopped = false;
    this.inputs = [];
    this.outputs = [];
  }

  public async run(inputs: TInput[]): Promise<TOutput[]> {
    this.inputs = inputs;
    this.outputs = [];
    this.currentIndex = 0;
    this.isStopped = false;

    return this.executeTasks();
  }

  public async stop(): Promise<void> {
    this.isStopped = true;
  }

  public async resume(): Promise<TOutput[]> {
    if (!this.isStopped) {
      throw new Error('TaskDispatcher is not stopped');
    }

    this.isStopped = false;
    return this.executeTasks();
  }

  private async executeTasks(): Promise<TOutput[]> {
    while (this.currentIndex < this.inputs.length && !this.isStopped) {
      const output = await this.task.run(this.inputs[this.currentIndex]);
      this.outputs.push(output);
      this.currentIndex++;
    }

    return this.outputs;
  }
}

export { TaskDispatcher };
