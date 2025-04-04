import { Controller, Post, Body, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from './models/user.schema';
import { Public } from 'src/common/decorators/public.decorator';
import { UpdateUserPasswordDto } from './dto/update-user-password';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  getUser(@CurrentUser() user: User) {
    return user;
  }

  @Put()
  update(@CurrentUser() { _id }: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(_id.toHexString(), updateUserDto);
  }

  @Put('password')
  updatePassword(
    @CurrentUser() { _id }: User,
    @Body() { oldPassword, newPassword }: UpdateUserPasswordDto,
  ) {
    return this.usersService.updatePassword({
      _id: _id.toHexString(),
      oldPassword,
      newPassword,
    });
  }
}
