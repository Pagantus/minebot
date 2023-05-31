import { Task } from './base';
import { Vec3 } from 'vec3';
import { TBot } from '../bot/base';

class FindBlocksTask extends Task<Vec3, Vec3[]> {
  blockType: number;
  maxDistance: number;
  count: number;

  constructor(bot: TBot, blockName: string, maxDistance: number, count: number) {
    super(bot);

    this.blockType = bot.registry.blocksByName[blockName].id;
    this.maxDistance = maxDistance;
    this.count = count;
  }

  protected async start(point: Vec3): Promise<Vec3[]> {
    return this.bot.findBlocks({
      point: point,
      matching: this.blockType,
      maxDistance: this.maxDistance,
      count: this.count
    });
  }
}

export { FindBlocksTask };
