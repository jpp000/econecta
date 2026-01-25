import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { DatabaseModule } from '@econecta/database';
import { User, UserSchema } from './entities/user.schema';
import { UsersRepository } from './repositories/users.repository';

@Module({
  imports: [
    DatabaseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
})
export class UsersModule {}

