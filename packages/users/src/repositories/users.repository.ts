import { AbstractRepository } from '@econecta/database';
import { User } from '../entities/user.schema';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersRepository extends AbstractRepository<User> {
  protected logger: Logger = new Logger(UsersRepository.name);

  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
}

