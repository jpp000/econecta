import { Controller, Body, Get, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { CurrentUser } from 'src/common/decorators/current-user.decorator';
import { User } from './models/user.schema';
import { UpdateUserPasswordDto } from './dto/update-user-password';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getUser(@CurrentUser() user: User) {
    return user;
  }

  @Get()
  getAllUsers() {
    return this.usersService.findAll();
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
