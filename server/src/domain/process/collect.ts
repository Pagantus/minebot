import { goals } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import { Item } from 'prismarine-item';
import { TBot } from '../bot/base';
import { DigTask } from '../task/dig';
import { MovementTask } from '../task/movement';
import { PickUpItemTask } from '../task/pickUpItem';
import { GoalBlockConversionTask } from '../task/utils/goalBlockConversion';
import { Process } from './base';

type CollectProcessContext = {
  init: Vec3;
  goal: goals.Goal;
  item: Item;
};

class CollectProcess extends Process<Vec3, CollectProcessContext> {
  constructor(bot: TBot) {
    super([
      { task: new GoalBlockConversionTask(bot, 'GoalLookAtBlock'), inputField: 'init', outputField: 'goal' },
      { task: new MovementTask(bot), inputField: 'goal' },
      { task: new DigTask(bot), inputField: 'init', outputField: 'item' },
      { task: new PickUpItemTask(bot), inputField: 'item' }
    ]);
  }
}

export { CollectProcess };
