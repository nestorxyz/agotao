import TelegramBot from "node-telegram-bot-api";

export class TelegramBotSingleton {
  private static instance: TelegramBotSingleton;
  private bot: TelegramBot;

  private constructor(token: string) {
    this.bot = new TelegramBot(token, { polling: true });
  }

  public static getInstance(token: string): TelegramBotSingleton {
    if (!TelegramBotSingleton.instance) {
      TelegramBotSingleton.instance = new TelegramBotSingleton(token);
    }

    return TelegramBotSingleton.instance;
  }

  public getBot(): TelegramBot {
    return this.bot;
  }
}
