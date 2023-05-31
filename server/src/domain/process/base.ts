import { ITask } from '../task/base';

interface IProcess<TInput> {
  run(input: TInput): Promise<void>;
  stop(): Promise<void>;
  resume(): Promise<void>;
}

type TaskData<TContext> = {
  task: ITask<any, any>;
  inputField: keyof TContext;
  outputField?: keyof TContext;
};

type ProcessContext = Record<string, any>;

class Process<TInput, TContext extends ProcessContext> implements IProcess<TInput> {
  private taskDatas: TaskData<TContext>[];
  private currentIndex: number;
  private context: Partial<TContext>;
  private isStopped: boolean;

  constructor(taskDatas: TaskData<TContext>[]) {
    this.taskDatas = taskDatas;
    this.currentIndex = 0;
    this.context = {};
    this.isStopped = false;
  }

  public async run(input: TInput): Promise<void> {
    return this.start(input);
  }

  protected async start(input: TInput | void): Promise<void> {
    if (input) {
      this.updateContext('init', input);
    }

    try {
      for (this.currentIndex; this.currentIndex < this.taskDatas.length; this.currentIndex++) {
        const taskData = this.taskDatas[this.currentIndex];
        const output = await taskData.task.run(this.context[taskData.inputField]);
        if (taskData.outputField) {
          this.updateContext(taskData.outputField, output);
        }

        if (this.isStopped) {
          taskData.task.stop();
          return;
        }
      }
      this.currentIndex = 0;
    } catch (error) {
      this.isStopped = true;
      throw error;
    }
  }

  public async stop(): Promise<void> {
    this.isStopped = true;
  }

  public async resume(): Promise<void> {
    if (this.isStopped) {
      this.isStopped = false;
      await this.start();
    }
  }

  private updateContext(field: keyof TContext, data: any) {
    this.context = { ...this.context, [field]: data };
  }
}

export { Process };
export type { IProcess };
