import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'src/users/models/user.schema';

const getUserByContext = (context: ExecutionContext): User => {
  const request = context.switchToHttp().getRequest<Request & { user: User }>();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getUserByContext(context),
);
