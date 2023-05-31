import { Task } from './base';
import { Vec3 } from 'vec3';
import { Entity } from 'prismarine-entity';
import { TBot } from '../bot/base';
import { waitTicks } from '../../utils/wait';
import { BaseTaskError } from './error';

const errorPrefix = 'Ошибка при выкапывании';

class DigTask extends Task<Vec3, Entity | null> {
  constructor(bot: TBot) {
    super(bot);
  }

  protected async start(blockPosition: Vec3): Promise<Entity | null> {
    let drop: Entity | null = null;

    const listener = (item: Entity) => {
      const distance = item.position.distanceTo(blockPosition.offset(0.5, 0.5, 0.5));

      if (distance <= 0.5) {
        drop = item;
        this.bot.removeListener('itemDrop', listener);
      }
    };

    this.bot.on('itemDrop', listener);

    const block = this.bot.blockAt(blockPosition);

    if (!block) {
      throw new DigTaskError('Блок не найден');
    }

    if (!this.bot.canDigBlock(block)) {
      throw new DigTaskError('Блок слишком далеко');
    }

    try {
      await this.bot.lookAt(blockPosition);
      await this.bot.tool.equipForBlock(block);
      await this.bot.dig(block);
    } catch (error) {
      const message = (error as Error).message ?? error;
      throw new DigTaskError(message);
    }

    //waiting for item drop
    await waitTicks(10, this.bot);

    return drop;
  }
}

class DigTaskError extends BaseTaskError {
  constructor(message: string) {
    super('DIG', message);
  }
}

export { DigTask };
