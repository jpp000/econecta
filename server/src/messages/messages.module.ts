import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesRepository } from './messages.repository';
import { DatabaseModule } from 'src/common/database/database.module';
import { Message, MessageSchema } from './models/messages.schema';

@Module({
    imports: [
        DatabaseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),
      ],
    providers: [MessagesService, MessagesRepository],
    exports: [MessagesService],
})
export class MessagesModule {}
