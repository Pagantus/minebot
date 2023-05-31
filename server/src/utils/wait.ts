import { TBot } from '../domain/bot/base';

const waitMs = (ms: number) => new Promise((res) => setTimeout(res, ms));

const waitTicks = (ticks: number, bot: TBot) =>
  new Promise<void>((resolve) => {
    let remainingTicks = ticks;

    const listener = () => {
      remainingTicks--;
      if (remainingTicks <= 0) {
        bot.removeListener('physicTick', listener);
        resolve();
      }
    };
    bot.on('physicTick', listener);
  });

export { waitMs, waitTicks };
