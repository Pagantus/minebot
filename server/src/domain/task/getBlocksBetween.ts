import { Task } from './base';
import { Vec3 } from 'vec3';
import { RangePosition } from '../types';

class GetBlocksBetweenTask extends Task<RangePosition, Vec3[]> {
  protected async start(range: RangePosition): Promise<Vec3[]> {
    const { start, end } = range;

    const points: Vec3[] = [start];
    let currentPoint = start;

    const xOffset = start.x - end.x < 0 ? 1 : -1;
    const yOffset = start.y - end.y < 0 ? 1 : -1;
    const zOffset = start.z - end.z < 0 ? 1 : -1;

    do {
      const dx = Math.abs(currentPoint.x - end.x);
      const dy = Math.abs(currentPoint.y - end.y);
      const dz = Math.abs(currentPoint.z - end.z);

      if (dx >= dy && dx >= dz) {
        const newPoint = currentPoint.clone().offset(xOffset, 0, 0);
        points.push(newPoint);
        currentPoint = newPoint;
        continue;
      }

      if (dy >= dx && dy >= dz) {
        const newPoint = currentPoint.clone().offset(0, yOffset, 0);
        points.push(newPoint);
        currentPoint = newPoint;
        continue;
      }

      if (dz >= dx && dz >= dy) {
        const newPoint = currentPoint.clone().offset(0, 0, zOffset);
        points.push(newPoint);
        currentPoint = newPoint;
        continue;
      }
    } while (!currentPoint.equals(end));

    return points;
  }
}

export { GetBlocksBetweenTask };
