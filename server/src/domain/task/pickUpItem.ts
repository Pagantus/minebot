import { Task } from './base';
import { Entity } from 'prismarine-entity';
import { MovementTask } from './movement';
import { TBot } from '../bot/base';
import { goals } from 'mineflayer-pathfinder';
import { BaseTaskError } from './error';

class PickUpItemTask extends Task<Entity, void> {
  private movement: MovementTask;

  constructor(bot: TBot) {
    super(bot);

    this.movement = new MovementTask(bot);
  }

  public async run(input: Entity): Promise<void> {
    return super.run(input);
  }

  protected async start(input: Entity): Promise<void> {
    const { position } = input;

    if (!input.isValid) {
      return;
    }

    return new Promise(async (resolve, reject) => {
      const listener = (entity: Entity) => {
        if (entity === input) {
          this.bot.removeListener('entityGone', listener);
          resolve();
        }
      };

      this.bot.on('entityGone', listener);
      try {
        await this.movement.run(new goals.GoalNear(position.x, position.y, position.z, 0.5));
      } catch (error) {
        const message = (error as Error).message ?? error;
        reject(new PickUpItemTaskError(message));
      }
    });
  }
}

class PickUpItemTaskError extends BaseTaskError {
  constructor(message: string) {
    super('PICK UP ITEM', message);
  }
}

export { PickUpItemTask };
