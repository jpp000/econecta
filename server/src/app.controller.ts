import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from './common/decorators/current-user.decorator';
import { User } from './users/models/user.schema';

@Controller()
export class AppController {
  @Get()
  hello(@CurrentUser() user: User) {
    return { message: `Hello ${user.name}` };
  }
}
