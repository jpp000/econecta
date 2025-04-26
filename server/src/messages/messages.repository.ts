import { Injectable, Logger } from "@nestjs/common";
import { Message } from "./models/messages.schema";
import { AbstractRepository } from "src/common/database/abstract.repository";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class MessagesRepository extends AbstractRepository<Message> {
  protected logger: Logger = new Logger(MessagesRepository.name);

  constructor(@InjectModel(Message.name) messageModel: Model<Message>) {
    super(messageModel) ;
  }
}