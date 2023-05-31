import { TBot } from '../bot/base';
import { Task } from './base';

type ChatTaskContext = {
  message: string;
};

class ChatTask extends Task<string, void> {
  constructor(bot: TBot) {
    super(bot);
  }

  protected async start(message: string): Promise<void> {
    this.bot.chat(message);
  }
}

export { ChatTask };
export type { ChatTaskContext };
