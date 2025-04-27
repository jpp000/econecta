import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';
import { Logger } from '@nestjs/common';
import { MESSAGES_EVENTS } from 'src/common/constants/events';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessagesGateway implements OnGatewayConnection {
  @WebSocketServer()
  server: Server;

  private readonly sockets: Socket[] = [];
  private readonly users: { [key: string]: Socket[] } = {};

  private readonly logger = new Logger(MessagesGateway.name);

  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token as string;

      if (!token) {
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verify(token);

      client.data.userId = payload.sub || payload.id;

      client.join(client.data.userId);
    } catch (err) {
      this.logger.error('Error during WebSocket connection', err);
      client.disconnect();
    }
  }

  @SubscribeMessage(MESSAGES_EVENTS.SEND_PRIVATE_MESSAGE)
  async handleMessage(
    @MessageBody()
    { text, receiverId }: { text: string; receiverId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = client.data.userId;

    if (!senderId) {
      client.disconnect();
      return;
    }

    const message = await this.messagesService.sendPrivateMessage({
      text,
      senderId,
      receiverId,
    });

    if (receiverId) {
      this.server
        .to(receiverId)
        .emit(MESSAGES_EVENTS.RECEIVE_PRIVATE_MESSAGE, message);
    }
  }

  @SubscribeMessage(MESSAGES_EVENTS.SEND_PUBLIC_MESSAGE)
  async handlePublicMessage(
    @MessageBody() { text }: { text: string },
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = client.data.userId;

    if (!senderId) {
      client.disconnect();
      return;
    }

    const message = await this.messagesService.sendPublicMessage({
      senderId,
      text,
    });

    this.server.emit(MESSAGES_EVENTS.RECEIVE_PUBLIC_MESSAGE, message);
  }

  @SubscribeMessage(MESSAGES_EVENTS.EDIT_MESSAGE)
  async handleEditMessage(
    @MessageBody()
    { text, messageId }: { text: string; messageId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = client.data.userId;

    if (!senderId) {
      client.disconnect();
      return;
    }

    // Check if the message belongs to the sender

    // const message = await this.messagesService.findMessage({
    //   messageId,
    //   userId: senderId,
    // });

    // if (!message) {
    //   client.emit(MESSAGES_EVENTS.EDIT_MESSAGE, {
    //     error: 'Message not found or you are not the sender',
    //   });
    //   return;
    // }

    const updatedMessage = await this.messagesService.updateMessage({
      messageId,
      userId: senderId,
      text,
    });

    this.server.emit(MESSAGES_EVENTS.EDIT_MESSAGE, updatedMessage);
  }

  @SubscribeMessage(MESSAGES_EVENTS.DELETE_MESSAGE)
  async handleDeleteMessage(
    @MessageBody()
    { messageId }: { messageId: string },
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = client.data.userId;

    if (!senderId) {
      client.disconnect();
      return;
    }

    // Check if the message belongs to the sender

    // const message = await this.messagesService.findMessage({
    //   messageId,
    //   userId: senderId,
    // });

    // if (!message) {
    //   client.emit(MESSAGES_EVENTS.DELETE_MESSAGE, {
    //     error: 'Message not found or you are not the sender',
    //   });
    //   return;
    // }

    const deletedMessage = await this.messagesService.deleteMessage({
      messageId,
      userId: senderId,
    });

    this.server.emit(MESSAGES_EVENTS.DELETE_MESSAGE, deletedMessage);
  }
}
