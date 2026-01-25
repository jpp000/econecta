import { Controller, Body, Get, Put } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CurrentUser } from '@econecta/common';
import { User } from '../entities/user.schema';
import { UpdateUserPasswordDto } from '../dto/update-user-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  getUser(@CurrentUser() user: User) {
    return user;
  }

  @Get('contacts')
  getAllUsers(@CurrentUser() user: User) {
    return this.usersService.findAllContacts({ id: user._id.toHexString() });
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

