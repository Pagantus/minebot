import { Vec3 } from 'vec3';
import { TBot } from '../../bot/base';
import { Task } from '../base';
import { PlaceBlockInput } from '../placeBlock';

class PlaceBlockInputConversionTask extends Task<Vec3[], PlaceBlockInput[]> {
  private ignoreLastBlock;

  constructor(bot: TBot, ignoreLastBlock: boolean = true) {
    super(bot);

    this.ignoreLastBlock = ignoreLastBlock;
  }

  protected async start(positions: Vec3[]): Promise<PlaceBlockInput[]> {
    const inputs: PlaceBlockInput[] = [];

    const axis = this.ignoreLastBlock ? 2 : 1;
    for (let index = 0; index + axis < positions.length; index++) {
      const position = positions[index];
      const nextPosition = positions[index + 1];

      const block = this.bot.blockAt(position)!;

      const { x, y, z } = position.minus(nextPosition);

      const input: PlaceBlockInput = {
        ref: block,
        face: new Vec3(-x, -y, -z)
      };
      inputs.push(input);
    }

    return inputs;
  }
}

export { PlaceBlockInputConversionTask };
