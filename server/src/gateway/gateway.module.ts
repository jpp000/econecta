import { Module } from '@nestjs/common';
import { MessagesGateway } from './sockets-gateway';
import { MessagesModule } from 'src/messages/messages.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MessagesModule, JwtModule],
  providers: [MessagesGateway],
})
export class GatewayModule {}
