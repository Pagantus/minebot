import { Task } from './base';
import { Vec3 } from 'vec3';
import { TBot } from '../bot/base';
import { Block } from 'prismarine-block';
import { BaseTaskError } from './error';

type PlaceBlockInput = { ref: Block; face: Vec3 };

class PlaceBlockTask extends Task<PlaceBlockInput, void> {
  private itemTypes: number[];

  constructor(bot: TBot, blockNames: string[]) {
    super(bot);

    this.itemTypes = blockNames.map((name) => {
      const item = bot.registry.itemsByName[name];
      if (!item) {
        throw new PlaceBlockTaskError('Предмет с таким названием не найден');
      }
      return item.id;
    });
  }

  protected async start({ ref, face }: PlaceBlockInput): Promise<void> {
    let block = null;

    for (const itemType of this.itemTypes) {
      const item = this.bot.inventory.findInventoryItem(itemType, null, false);
      if (item) {
        block = item;
        break;
      }
    }

    if (!block) {
      throw new PlaceBlockTaskError('Блоки для установки не найдены');
    }

    try {
      await this.bot.equip(block, 'hand');
      await this.bot.placeBlock(ref, face);
    } catch (error) {
      const message = (error as Error).message ?? error;
      throw new PlaceBlockTaskError(message);
    }
  }
}

class PlaceBlockTaskError extends BaseTaskError {
  constructor(message: string) {
    super('PLACE BLOCK', message);
  }
}

export { PlaceBlockTask };
export type { PlaceBlockInput };
