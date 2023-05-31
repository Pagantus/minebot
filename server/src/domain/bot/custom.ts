import { IBot, TBot } from './base';
import { createBot } from 'mineflayer';
import { IProcess } from '../process/base';
import { plugin as toolsPlugin } from 'mineflayer-tool';
import { goals, Movements, pathfinder } from 'mineflayer-pathfinder';
import { Item } from 'prismarine-item';
import { MovementTask } from '../task/movement';
import { ConsoleLogger } from '../../infrastructure/logger/console';
import { AggregateLogger } from '../../infrastructure/logger/aggregate';
import { Vec3 } from 'vec3';
import { DigTask } from '../task/dig';
import { PlaceBlockTask } from '../task/placeBlock';
import { GetBlocksBetweenTask } from '../task/getBlocksBetween';
import { PickUpItemTask } from '../task/pickUpItem';
import { CollectProcess } from '../process/collect';
import { FindBlocksTask } from '../task/findBlocks';
import { LavaHandleProcess } from '../process/lavaHandle';

class CustomBot implements IBot {
  private username: string;
  private bot: TBot;

  constructor(username: string, host: string, port: number) {
    this.username = username;
    const bot = createBot({ username, host, port });
    bot.loadPlugins([pathfinder, toolsPlugin]);

    this.bot = bot as TBot;

    this.bot.once('spawn', () => {
      this.bot.chat('/gamemode survival');

      this.work();
    });

    this.bot.on('death', () => {});

    this.bot.on('login', () => console.log('login'));
  }

  public async work(): Promise<void> {}

  public async stop(): Promise<void> {}

  public async init(): Promise<void> {}

  public async continue(): Promise<void> {}

  public async setProcess(process: IProcess<any>): Promise<void> {}

  public async setMaster(master: string): Promise<void> {}

  public async setTrustedPlayers(players: string[]): Promise<void> {}

  private checkProcess(): void {}
}

export { CustomBot };
