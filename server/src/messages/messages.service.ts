import { Injectable, Logger } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { SendPrivateMessageDto } from './dto/send-private-message.dto';
import { SendPublicMessageDto } from './dto/send-public-message.dto';
import { GetPrivateChatMessagesDto } from './dto/get-private-chat-messages.dto';
import { FindMessageDto } from './dto/find-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class MessagesService {
  private readonly logger = new Logger(MessagesService.name);

  constructor(
    private readonly messagesRepository: MessagesRepository,
    private readonly usersService: UsersService,
  ) {}

  async getPrivateChatMessages({
    receiverId,
    userId,
  }: GetPrivateChatMessagesDto) {
    try {
      return await this.messagesRepository.find({
        $or: [
          { sender: userId, receiver: receiverId },
          { sender: receiverId, receiver: userId },
        ],
        populate: ['sender', 'receiver'],
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getPublicChatMessages() {
    try {
      return await this.messagesRepository.find({
        receiver: null,
        populate: ['sender'],
      });
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
        sender: senderId,
        receiver: receiverId,
        text,
        populate: ['sender', 'receiver'],
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async sendPublicMessage({ senderId, text }: SendPublicMessageDto) {
    try {
      const sender = await this.usersService.findById(senderId);

      if (!sender) {
        throw new Error('Sender not found');
      }

      const messageCreated = await this.messagesRepository.create({
        sender: senderId,
        text,
        populate: ['sender'],
      });

      return {
        ...messageCreated,
        sender: {
          _id: sender._id,
          username: sender.username,
          email: sender.email,
          avatar: sender.avatar,
        },
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async deleteMessage({ messageId, userId }: FindMessageDto) {
    try {
      return await this.messagesRepository.findOneAndDelete({
        _id: messageId,
        sender: userId,
      });
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async updateMessage({ messageId, userId, text }: UpdateMessageDto) {
    try {
      return await this.messagesRepository.findOneAndUpdate(
        { sender: userId, _id: messageId },
        { text, new: true, populate: ['sender'] },
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
