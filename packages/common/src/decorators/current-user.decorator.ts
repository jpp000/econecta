import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

const getUserByContext = (context: ExecutionContext): any => {
  const request = context.switchToHttp().getRequest<Request & { user: any }>();
  return request.user;
};

export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) => getUserByContext(context),
);

