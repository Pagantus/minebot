import { Vec3 } from 'vec3';
import { Task } from './base';
import { TBot } from '../bot/base';
import { RangePosition } from '../types';

class GetBlocksInRangeTask extends Task<RangePosition, Vec3[]> {
  public async start(range: RangePosition): Promise<Vec3[]> {
    const { start, end } = range;

    if (end.x < start.x) [start.x, end.x] = [end.x, start.x];
    if (end.y < start.y) [start.y, end.y] = [end.y, start.y];
    if (end.z < start.z) [start.z, end.z] = [end.z, start.z];

    const blocksInRange: Vec3[] = [];

    for (let x = start.x; x <= end.x; x++) {
      for (let y = start.y; y <= end.y; y++) {
        for (let z = start.z; z <= end.z; z++) {
          blocksInRange.push(new Vec3(x, y, z));
        }
      }
    }

    const botPosition = this.bot.entity.position.offset(0, this.bot.entity.height, 0);

    return blocksInRange.sort((a, b) => {
      const distToA = a.distanceTo(botPosition);
      const distToB = b.distanceTo(botPosition);
      return distToA - distToB;
    });
  }
}

export { GetBlocksInRangeTask };
export type { RangePosition };
