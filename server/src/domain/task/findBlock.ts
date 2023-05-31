import { Task } from './base';
import { Vec3 } from 'vec3';
import { TBot } from '../bot/base';
import { BaseTaskError } from './error';

class FindBlockTask extends Task<Vec3, Vec3> {
  blockType: number;
  maxDistance: number;

  constructor(bot: TBot, blockName: string, maxDistance: number) {
    super(bot);

    this.blockType = bot.registry.blocksByName[blockName].id;
    this.maxDistance = maxDistance;
  }

  protected async start(point: Vec3): Promise<Vec3> {
    const block = this.bot.findBlock({
      point: point,
      matching: this.blockType,
      maxDistance: this.maxDistance
    });

    if (!block) {
      throw new FindBlockTaskError('Блок не найден');
    }

    return block.position;
  }
}

class FindBlockTaskError extends BaseTaskError {
  constructor(message: string) {
    super('FIND BLOCK', message);
  }
}

export { FindBlockTask };
