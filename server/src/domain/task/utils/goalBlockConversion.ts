import { goals } from 'mineflayer-pathfinder';
import { Vec3 } from 'vec3';
import { TBot } from '../../bot/base';
import { Task } from '../base';

type GoalType = Extract<
  keyof typeof goals,
  'GoalNear' | 'GoalNearXZ' | 'GoalBlock' | 'GoalGetToBlock' | 'GoalLookAtBlock' | 'GoalXZ'
>;

class GoalBlockConversionTask extends Task<Vec3, goals.Goal> {
  private goalFactory: GoalBlockFactory;
  private goalBlockType: GoalType;

  constructor(bot: TBot, goalBlockType: GoalType, nearRange: number = 1) {
    super(bot);

    this.goalFactory = new GoalBlockFactory(bot, nearRange);
    this.goalBlockType = goalBlockType;
  }

  protected async start(input: Vec3): Promise<goals.Goal> {
    const goal = this.goalFactory.createGoalBlock(this.goalBlockType, input);
    return goal;
  }
}

class GoalBlockFactory {
  private nearRange: number;
  private bot: TBot;

  constructor(bot: TBot, nearRange: number) {
    this.nearRange = nearRange;
    this.bot = bot;
  }

  public createGoalBlock(type: GoalType, position: Vec3): goals.Goal {
    const { x, y, z } = position;

    switch (type) {
      case 'GoalNear':
        return new goals.GoalNear(x, y, z, this.nearRange);
      case 'GoalNearXZ':
        return new goals.GoalNearXZ(x, z, this.nearRange);
      case 'GoalBlock':
        return new goals.GoalBlock(x, y, z);
      case 'GoalGetToBlock':
        return new goals.GoalGetToBlock(x, y, z);
      case 'GoalLookAtBlock':
        return new goals.GoalLookAtBlock(position, this.bot.world);
      case 'GoalXZ':
        return new goals.GoalXZ(x, z);
      default:
        throw new Error(`Тип Goal: ${type} не поддерживается`);
    }
  }
}

export { GoalBlockConversionTask };
export type { GoalType };
