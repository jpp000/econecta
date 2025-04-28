import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Message, MessageSchema } from './models/messages.schema';
import { MessagesController } from './messages.controller';
import { UsersModule } from 'src/users/users.module';

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
