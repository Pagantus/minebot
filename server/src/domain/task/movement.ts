import { goals, Movements } from 'mineflayer-pathfinder';
import { TBot } from '../bot/base';
import { Task } from './base';
import { BaseTaskError } from './error';

class MovementTask extends Task<goals.Goal, void> {
  constructor(bot: TBot, movements?: Movements) {
    super(bot);

    if (movements) {
      this.bot.pathfinder.setMovements(movements);
    }
  }

  protected async start(goal: goals.Goal): Promise<void> {
    try {
      await this.bot.pathfinder.goto(goal);
    } catch (error) {
      const message = (error as Error).message ?? error;
      throw new MovementTaskError(message);
    }
  }

  public async stop(): Promise<void> {
    await super.stop();
    this.bot.pathfinder.setGoal(null);
  }
}

class MovementTaskError extends BaseTaskError {
  constructor(message: string) {
    super('MOVEMENT', message);
  }
}

export { MovementTask };
