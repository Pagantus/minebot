class BaseTaskError extends Error {
  constructor(taskName: string, message: string) {
    super(`[${taskName}] ${message}`);
    this.name = 'TaskError';
  }
}

export { BaseTaskError };
