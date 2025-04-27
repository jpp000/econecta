import { Module } from '@nestjs/common';
import { MessagesModule } from 'src/messages/messages.module';
import { GatewayProvider } from './gateway';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MessagesModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_ACCESS_TOKEN_SECRET'),
        signOptions: {
          expiresIn: configService.get<number>(
            'JWT_ACCESS_TOKEN_EXPIRATION_MS',
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GatewayProvider],
})
export class GatewayModule {}
