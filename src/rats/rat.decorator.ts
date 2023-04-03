import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { RatAddDto } from './rat.dto';

export const Rat = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    let ratAddDto: RatAddDto = { age: -1, weight: -1, authToken: 'authToken' };
    Object.getOwnPropertyNames(request.body).every((val) => {
      return val in ratAddDto;
    });
    if (
      Object.getOwnPropertyNames(request.body).every((val) => {
        return val in ratAddDto;
      })
    ) {
      return request.body;
    } else throw new Error('Invalid body passed');
  },
);
