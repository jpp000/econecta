import { Module } from '@nestjs/common';
import { MessagesService } from './services/messages.service';
import { MessagesRepository } from './repositories/messages.repository';
import { DatabaseModule } from '@econecta/database';
import { Message, MessageSchema } from './entities/message.schema';
import { MessagesController } from './controllers/messages.controller';
import { UsersModule } from '@econecta/users';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
    UsersModule,
  ],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
  exports: [MessagesService],
})
export class MessagesModule {}

