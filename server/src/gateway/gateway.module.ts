import { Module } from '@nestjs/common';
import { MessagesGateway } from './sockets-gateway';
import { MessagesModule } from 'src/messages/messages.module';

@Module({
  imports: [MessagesModule],
  providers: [MessagesGateway],
})
export class GatewayModule {}
