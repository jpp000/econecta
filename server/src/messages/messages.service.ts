import { Get, Injectable, Logger } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { SendPrivateMessageDto } from './dto/send-private-message.dto';
import { MESSAGES_EVENTS } from 'src/common/constants/events';
import { SendPublicMessageDto } from './dto/send-public-message.dto';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(private readonly messagesRepository: MessagesRepository) {}

  @Get()
  async getMessages(senderId: string) {
    try {
      return await this.messagesRepository.find({ senderId });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async sendPrivateMessage({
    senderId,
    receiverId,
    text,
  }: SendPrivateMessageDto) {
    try {
      await this.messagesRepository.create({
        senderId,
        receiverId,
        text,
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async sendPublicMessage(senderId: string, { text }: SendPublicMessageDto) {
    try {
      await this.messagesRepository.create({
        senderId,
        text,
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async deleteMessage(id: string) {
    try {
      return await this.messagesRepository.findOneAndDelete({ id });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async updatePrivateMessage({ text, senderId, receiverId, messageId }) {
    try {
      return await this.messagesRepository.findOneAndUpdate(
        { senderId, receiverId, _id: messageId },
        { text },
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
