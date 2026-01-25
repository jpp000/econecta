import { AbstractRepository } from '@econecta/database';
import { Message } from '../entities/message.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MessagesRepository extends AbstractRepository<Message> {
  protected logger: Logger = new Logger(MessagesRepository.name);

  constructor(@InjectModel(Message.name) messageModel: Model<Message>) {
    super(messageModel);
  }
}

