import { Vec3 } from 'vec3';
import { RangePosition } from '../types';
import { Task } from './base';
import { BaseTaskError } from './error';

class GetBoundingBoxBlockTask extends Task<Vec3, RangePosition> {
  protected async start(point: Vec3): Promise<RangePosition> {
    const block = this.bot.findBlock({
      matching: (block) => {
        const hasBoundingBox = block.boundingBox === 'block';
        // const distance = this.bot.entity.position.offset(0, this.bot.entity.height, 0).distanceTo(block.position);

        return hasBoundingBox;
      },
      point
    });

    if (!block) {
      throw new GetBoundingBoxBlockTaskError('Блок не найден');
    }

    return { start: block.position, end: point };
  }
}

class GetBoundingBoxBlockTaskError extends BaseTaskError {
  constructor(message: string) {
    super('GET BOUNDING BOX BLOCK', message);
  }
}

export { GetBoundingBoxBlockTask };
