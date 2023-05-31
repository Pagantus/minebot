import { Vec3 } from 'vec3';
import { TBot } from '../bot/base';
import { FindBlocksTask } from '../task/findBlocks';
import { GetBlocksBetweenTask } from '../task/getBlocksBetween';
import { GetBoundingBoxBlockTask } from '../task/getBoundindBoxBlock';
import { PlaceBlockInput, PlaceBlockTask } from '../task/placeBlock';
import { TaskDispatcher } from '../task/utils/dispatcher';
import { PlaceBlockInputConversionTask } from '../task/utils/placeBlockInputConversion';
import { RangePosition } from '../types';
import { Process } from './base';

type LavaHandleProcessContext = {
  init: Vec3;
  lavaPositions: Vec3[];
  rangePositions: RangePosition[];
  blocksBetween: Vec3[][];
  blocksForPlace: PlaceBlockInput[][];
};

class LavaHandleProcess extends Process<Vec3, LavaHandleProcessContext> {
  constructor(bot: TBot) {
    super([
      { task: new FindBlocksTask(bot, 'lava', 1, 6), inputField: 'init', outputField: 'lavaPositions' },
      {
        task: new TaskDispatcher(new GetBoundingBoxBlockTask(bot)),
        inputField: 'lavaPositions',
        outputField: 'rangePositions'
      },
      {
        task: new TaskDispatcher(new GetBlocksBetweenTask(bot)),
        inputField: 'rangePositions',
        outputField: 'blocksBetween'
      },
      {
        task: new TaskDispatcher(new PlaceBlockInputConversionTask(bot, false)),
        inputField: 'blocksBetween',
        outputField: 'blocksForPlace'
      },
      {
        task: new TaskDispatcher(new TaskDispatcher(new PlaceBlockTask(bot, ['dirt', 'cobblestone']))),
        inputField: 'blocksForPlace'
      }
    ]);
  }
}

export { LavaHandleProcess };
