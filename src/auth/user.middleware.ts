import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    req['roles'] = 'scientist';
    next();
  }
}
