import { Injectable, Logger } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { SendPrivateMessageDto } from './dto/send-private-message.dto';
import { SendPublicMessageDto } from './dto/send-public-message.dto';
import { GetPrivateChatMessagesDto } from './dto/get-private-chat-messages.dto';
import { FindMessageDto } from './dto/find-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(private readonly messagesRepository: MessagesRepository) {}

  async getPrivateChatMessages({
    receiverId,
    userId,
  }: GetPrivateChatMessagesDto) {
    try {
      return await this.messagesRepository.find({
        $or: [
          { senderId: userId, receiverId },
          { senderId: receiverId, receiverId: userId },
        ],
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getPublicChatMessages() {
    try {
      return await this.messagesRepository.find({ receiverId: null });
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
      return await this.messagesRepository.create({
        senderId,
        receiverId,
        text,
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async sendPublicMessage({ senderId, text }: SendPublicMessageDto) {
    try {
      return await this.messagesRepository.create({
        senderId,
        text,
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async deleteMessage({ messageId, userId }: FindMessageDto) {
    try {
      return await this.messagesRepository.findOneAndDelete({
        _id: messageId,
        senderId: userId,
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async updateMessage({ messageId, userId, text }: UpdateMessageDto) {
    try {
      return await this.messagesRepository.findOneAndUpdate(
        { senderId: userId, _id: messageId },
        { text },
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
