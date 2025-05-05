import { Controller, Get, Param } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { GetPrivateChatMessagesDto } from './dto/get-private-chat-messages.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Get('private/:userId/:receiverId')
  async getPrivateChatMessages(
    @Param() getPrivateChatMessagesDto: GetPrivateChatMessagesDto,
  ) {
    return this.messagesService.getPrivateChatMessages(
      getPrivateChatMessagesDto,
    );
  }

  @Get('public')
  async getPublicChatMessages() {
    return this.messagesService.getPublicChatMessages();
  }
}
