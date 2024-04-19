/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable, Logger } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
  private readonly bot: TelegramBot;
  private readonly logger = new Logger(TelegramService.name);
  constructor() {
    const token = process.env.TELEGRAM_TOKEN;
    if (!token) throw new Error('Telegram Bot Token not provided!');
    this.bot = new TelegramBot(token, { polling: true });
    this.bot.on('message', this.onReceiveMessage.bind(this));
  }
  private onReceiveMessage(message: TelegramBot.Message) {
    const { chat, text } = message.chat;
    const { id, username } = chat;
    const date = new Date(message.date * 1000).toLocaleString();
    this.logger.debug({ username, date, text });
    this.sendMessage(id, `Hello ${username}! This is from the Nest server 👋`);
  }
  private sendMessage(chatId: TelegramBot.ChatId, text: string) {
    this.bot.sendMessage(chatId, text);
  }
}
