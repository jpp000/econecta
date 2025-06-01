import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { MessagesService } from 'src/messages/messages.service';
import { Logger } from '@nestjs/common';
import { MESSAGES_EVENTS } from 'src/common/constants/events';

@WebSocketGateway(4000, {
  cors: {
    origin: '*',
  },
})
export class GatewayProvider
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(GatewayProvider.name);
  private onlineUsers = new Set<string>();

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

      if (!payload.userId) {
        client.disconnect();
        return;
      }

      client.data.userId = payload.userId;

      client.join(client.data.userId as string);

      this.onlineUsers.add(client.data.userId as string);

      this.server.emit(
        MESSAGES_EVENTS.USERS_ONLINE,
        Array.from(this.onlineUsers),
      );
    } catch (err) {
      this.logger.error('Error during WebSocket connection', err);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.onlineUsers.delete(client.data.userId as string);

    this.server.emit(
      MESSAGES_EVENTS.USERS_ONLINE,
      Array.from(this.onlineUsers),
    );
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
        .to(senderId as string)
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

    console.log({ text, messageId, senderId });

    if (!senderId) {
      client.disconnect();
      return;
    }

    const updatedMessage = await this.messagesService.updateMessage({
      messageId,
      userId: senderId,
      text,
    });

    this.server.emit(MESSAGES_EVENTS.EDITED_MESSAGE, updatedMessage);
  }

  @SubscribeMessage(MESSAGES_EVENTS.DELETE_MESSAGE)
  async handleDeleteMessage(
    @MessageBody()
    messageId: string,
    @ConnectedSocket() client: Socket,
  ) {
    const senderId = client.data.userId;
    console.log({ messageId, senderId });

    if (!senderId) {
      client.disconnect();
      return;
    }

    const deletedMessageId = await this.messagesService.deleteMessage({
      messageId,
      userId: senderId,
    });

    this.server.emit(MESSAGES_EVENTS.DELETED_MESSAGE, deletedMessageId);
  }
}
