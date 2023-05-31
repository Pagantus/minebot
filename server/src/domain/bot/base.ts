import { IProcess } from '../process/base';
import { Pathfinder } from 'mineflayer-pathfinder';
import { Tool } from 'mineflayer-tool';
import { Bot } from 'mineflayer';

type TBot = Bot & Tool & Pathfinder;

interface IBot {
  init(): Promise<void>;
  work(): Promise<void>;
  stop(): Promise<void>;
  continue(): Promise<void>;
  setProcess(process: IProcess<any>): Promise<void>;
  setMaster(master: string): Promise<void>;
  setTrustedPlayers(players: string[]): Promise<void>;
}

enum BotStatus {
  INITIALIZING, //            Бот инициализируется
  CAPTCHA, //                 Бот вводит капчу (если необходимо)
  AUTHENTICATING, //          Бот авторизуется на сервере
  IN_LOBBY, //                Бот находится в лобби
  SERVER_TRANSITION, //       Бот переходит на конкретный сервер из лобби
  READY, //                   Бот готов начать работу
  WORKING, //                 Бот выполняет какие-либо действия (работа)
  STOPPED, //                 Бот остановлен
  DISCONNECTED, //            Бот отключен от сервера
  KICKED, //                  Бот был кикнут с сервера
  ERROR //                    Произошла ошибка, из-за которой бот не может продолжить работу
}

export { BotStatus };
export type { IBot, TBot };
