import { ConflictException, Injectable, Logger } from '@nestjs/common';
import { MessagesRepository } from './messages.repository';
import { SendPrivateMessageDto } from './dto/send-private-message.dto';
import { SendPublicMessageDto } from './dto/send-public-message.dto';
import { GetPrivateChatMessagesDto } from './dto/get-private-chat-messages.dto';
import { FindMessageDto } from './dto/find-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/models/user.schema';

interface MessageResponseDto {
  _id: string;
  text: string;
  sender: { _id: string; username: string };
  receiver?: { _id: string; username: string };
}

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
      return await this.messagesRepository.find(
        {
          $or: [
            { sender: userId, receiver: receiverId },
            { sender: receiverId, receiver: userId },
          ],
        },
        ['sender', 'receiver'],
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async getPublicChatMessages() {
    try {
      return await this.messagesRepository.find(
        {
          receiver: null,
        },
        ['sender'],
      );
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async sendPrivateMessage({
    senderId,
    receiverId,
    text,
  }: SendPrivateMessageDto): Promise<MessageResponseDto> {
    try {
      const messageCreated = await this.messagesRepository.create({
        sender: senderId,
        receiver: receiverId,
        text,
      });

      const sender = await this.usersService.getUser({ _id: senderId });
      const receiver = await this.usersService.getUser({ _id: receiverId });

      return {
        _id: messageCreated._id.toHexString(),
        text: messageCreated.text,
        sender: { _id: sender._id.toHexString(), username: sender.username },
        receiver: {
          _id: receiver._id.toHexString(),
          username: receiver.username,
        },
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async sendPublicMessage({
    senderId,
    text,
  }: SendPublicMessageDto): Promise<MessageResponseDto> {
    try {
      const sender = await this.usersService.findById(senderId);

      if (!sender) {
        throw new Error('Sender not found');
      }

      const messageCreated = await this.messagesRepository.create({
        sender: senderId,
        text,
        receiver: null,
      });

      return {
        _id: messageCreated._id.toHexString(),
        text: messageCreated.text,
        sender: {
          _id: sender._id.toHexString(),
          username: sender.username,
        },
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async deleteMessage({ messageId, userId }: FindMessageDto): Promise<string> {
    try {
      const message = await this.messagesRepository.findOne({
        _id: messageId,
        sender: userId,
      });

      console.log({ message });

      if (!message) {
        throw new ConflictException(
          'You are not the sender or message does not exists',
        );
      }

      await this.messagesRepository.findOneAndDelete({
        _id: messageId,
        sender: userId,
      });

      return message._id.toHexString();
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }

  async updateMessage({
    messageId,
    userId,
    text,
  }: UpdateMessageDto): Promise<MessageResponseDto> {
    try {
      const updatedMessage = await this.messagesRepository.findOneAndUpdate(
        { sender: userId, _id: messageId },
        { text, new: true },
      );

      if (!updatedMessage) {
        throw new ConflictException(
          'You are not the sender or message does not exists',
        );
      }

      const sender = await this.usersService.getUser({
        _id: userId,
      });

      let receiver: User | null = null;

      if (updatedMessage.receiver) {
        receiver = await this.usersService.getUser({
          _id: updatedMessage.receiver?.toHexString(),
        });
      }

      return {
        _id: updatedMessage._id.toHexString(),
        text: updatedMessage.text,
        sender: { _id: sender._id.toHexString(), username: sender.username },
        receiver: receiver
          ? {
              _id: receiver?._id.toHexString(),
              username: receiver?.username,
            }
          : undefined,
      };
    } catch (err) {
      this.logger.error(err);
      throw err;
    }
  }
}
