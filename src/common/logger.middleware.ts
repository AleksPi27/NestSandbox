import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.group('Request...');
    console.log(req.body);
    console.log(req['roles']);
    console.groupEnd();
    next();
  }
}
