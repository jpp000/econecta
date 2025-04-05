import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/models/user.schema';
import { TokenPayload } from './interfaces/token-payload.interface';
import { ConfigService } from '@nestjs/config';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  login(user: User) {
    const tokenPayload: TokenPayload = { userId: user._id.toHexString() };

    const accessToken = this.generateAccessToken(tokenPayload);

    return {
      user,
      token: accessToken,
    };
  }

  async signup(createUserDto: CreateUserDto) {
    const existingUser = await this.usersService.findByEmail(
      createUserDto.email,
    );

    if (existingUser) {
      throw new ConflictException('User already exists.');
    }

    const createdUser = await this.usersService.create(createUserDto);

    const tokenPayload: TokenPayload = {
      userId: createdUser._id.toHexString(),
    };

    const accessToken = this.generateAccessToken(tokenPayload);

    return {
      user: {
        username: createdUser.username,
        email: createdUser.email,
        _id: createdUser._id.toHexString(),
      },
      token: accessToken,
    };
  }

  private generateAccessToken(payload: TokenPayload): string {
    return this.jwtService.sign(payload, {
      secret: this.configService.getOrThrow('JWT_ACCESS_TOKEN_SECRET'),
      expiresIn: `${this.configService.getOrThrow('JWT_ACCESS_TOKEN_EXPIRATION_MS')}ms`,
    });
  }
}
