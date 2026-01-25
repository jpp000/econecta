import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { CurrentUser, Public } from '@econecta/common';
import { User } from '@econecta/users';
import { AuthService } from '../services/auth.service';
import { CreateUserDto } from '../dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@CurrentUser() user: User) {
    return this.authService.login(user);
  }

  @Public()
  @Post('signup')
  signup(@Body() createUserDto: CreateUserDto) {
    return this.authService.signup(createUserDto);
  }
}

