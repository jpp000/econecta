import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly usersService: UsersService) {
    super();
  }

  async validate(username: string, password: string) {
    try {
      return this.usersService.verifyUser(username, password);
    } catch (err) {
      throw new UnauthorizedException(err);
    }
  }
}
