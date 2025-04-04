import {
  ConflictException,
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { UpdateUserPasswordDto } from './dto/update-user-password';
import { GetUserDto } from './dto/get-user.dto';

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserInput: CreateUserDto) {
    try {
      return await this.usersRepository.create({
        ...createUserInput,
        password: await bcrypt.hash(createUserInput.password, 10),
      });
    } catch (err) {
      this.logger.error(err);

      if (err.message.includes('E11000')) {
        throw new UnprocessableEntityException('User already exists.');
      }
      throw err;
    }
  }

  async update(_id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.usersRepository.findOneAndUpdate(
        { _id },
        { ...updateUserDto },
      );
    } catch (err) {
      this.logger.error(err);

      if (err.message.includes('E11000')) {
        throw new ConflictException('User already exists.');
      }
      throw err;
    }
  }

  async verifyUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });

    if (!user.password) {
      throw new UnauthorizedException('Sign in with Google');
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Password is not valid');
    }

    return user;
  }

  async updatePassword({
    _id,
    oldPassword,
    newPassword,
  }: UpdateUserPasswordDto & { _id: string }) {
    const user = await this.usersRepository.findOne({ _id });

    const passwordIsValid = await bcrypt.compare(oldPassword, user.password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Password is not valid');
    }

    try {
      return await this.usersRepository.findOneAndUpdate(
        { _id },
        { password: await bcrypt.hash(newPassword, 10) },
      );
    } catch (err) {
      this.logger.error(err);

      throw err;
    }
  }

  async getUser({ _id }: GetUserDto) {
    return this.usersRepository.findOne({ _id });
  }
}
