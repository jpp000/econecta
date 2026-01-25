import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { DatabaseModule } from '@econecta/database';
import { UsersModule } from '@econecta/users';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from '@econecta/auth';
import { GatewayModule } from '@econecta/gateway';
import { MessagesModule } from '@econecta/messages';
import { CalendarModule } from '@econecta/calendar';
import { CoursesModule } from '@econecta/courses';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        MONGODB_URI: Joi.string().required(),
        JWT_ACCESS_TOKEN_SECRET: Joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRATION_MS: Joi.number().required(),
        NODE_ENV: Joi.string().valid('development', 'production').required(),
      }),
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
          },
        },
      },
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    GatewayModule,
    MessagesModule,
    CalendarModule,
    CoursesModule,
  ],
})
export class AppModule {}

