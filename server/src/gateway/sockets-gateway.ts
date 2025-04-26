import { OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MESSAGES_EVENTS } from 'src/common/constants/events';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { SendPrivateMessageDto } from 'src/messages/dto/send-private-message.dto';
import { MessagesService } from 'src/messages/messages.service';
import { User } from 'src/users/models/user.schema';

type SocketWithUser = Socket & {
  user: User;
};

@WebSocketGateway(4000, {
  cors: '*',
})
export class MessagesGateway implements OnModuleInit {
  constructor(
    private readonly messagesService: MessagesService,
    private readonly jwtService: JwtService,
  ) { }

  @WebSocketServer()
  server: Server;

  private connectedSockets: Map<string, string> = new Map();

  middleware(socket: SocketWithUser, next: (err?: any) => void) {
    const token = socket.handshake.headers['authorization'];

    if (!token) {
      throw new Error('Unauthorized');
    }
    
    const user = this.jwtService.verify(token);

    if (!user) {
      throw new Error('Unauthorized');
    }

    socket.user = user;
    next();
  }

  onModuleInit() {
    this.server.use(this.middleware).on('connection', (socket: SocketWithUser) => {
      this.connectedSockets.set(socket.user.id, socket.id);

      this.server.emit(
        MESSAGES_EVENTS.ONLINE_USERS,
        Array.from(this.connectedSockets.values()),
      );

      socket.on('disconnect', () => {
        this.connectedSockets.delete(socket.user.id);
      });
    });
  }

  @SubscribeMessage(MESSAGES_EVENTS.PUBLIC_MESSAGE)
  async sendPublicMessage(
    @CurrentUser() sender: User,
    @MessageBody() { text }: { text: string },
  ) {
    const message = await this.messagesService.sendPublicMessage(sender.id, {
      text,
    });

    this.server.emit(MESSAGES_EVENTS.PUBLIC_MESSAGE, message);
  }

  @SubscribeMessage(MESSAGES_EVENTS.PRIVATE_MESSAGE)
  async sendPrivateMessage(
    @CurrentUser() sender: User,
    @MessageBody() { receiverId, text }: SendPrivateMessageDto,
  ) {
    await this.messagesService.sendPrivateMessage({
      senderId: sender.id,
      receiverId,
      text,
    });

    const targetSocketId = this.connectedSockets.get(receiverId);

    if (targetSocketId) {
      this.server
        .to(targetSocketId)
        .emit(MESSAGES_EVENTS.PRIVATE_MESSAGE, text);
    }
  }

  @SubscribeMessage(MESSAGES_EVENTS.UPDATE_PRIVATE_MESSAGE)
  async updatePrivateMessage(
    @MessageBody() { text, senderId, receiverId, messageId },
  ) {
    const updatedMessage = this.messagesService.updatePrivateMessage({
      senderId,
      receiverId,
      messageId,
      text,
    });

    const targetSocketId = this.connectedSockets.get(receiverId);

    if (targetSocketId) {
      this.server
        .to(targetSocketId)
        .emit(MESSAGES_EVENTS.PRIVATE_MESSAGE, updatedMessage);
    }

    this.server.emit(MESSAGES_EVENTS.PRIVATE_MESSAGE, updatedMessage);
      
  }

  //   updatePublicMessage(
  //     @CurrentUser() sender: User,
  //     @MessageBody() { text, socket }: SendPrivateMessageDto,
  //   ) {
  //     const message = this.messagesService.updatePublicMessage(sender, {
  //       text,
  //       socket,
  //     });
  //     this.server.emit(MESSAGES_EVENTS.PUBLIC_MESSAGE, message);
  //   }

  //   deleteMessage(
  //     @CurrentUser() sender: User,
  //     @MessageBody() { id, socket }: SendPrivateMessageDto,
  //   ) {
  //     const message = this.messagesService.deleteMessage(sender, {
  //       id,
  //       socket,
  //     });
  //     this.server.emit(MESSAGES_EVENTS.PUBLIC_MESSAGE, message);
  //   }

  //   getConnectedSockets() {
  //     return this.connectedSockets;
  //   }

  //   getSocketById(socketId: string) {
  //     return this.connectedSockets.get(socketId);
  //   }

  //   getSocketByUserId(userId: string) {
  //     for (const [socketId, socket] of this.connectedSockets.entries()) {
  //       if (socket.user.id === userId) {
  //         return socket;
  //       }
  //     }
  //     return null;
  //   }

  //   getAllConnectedSockets() {
  //     return Array.from(this.connectedSockets.values());
  //   }
}
