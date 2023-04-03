import {
  Body,
  CanActivate,
  ExecutionContext,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    console.log(context.getHandler());
    return this.validateRequest(request, context);
  }

  validateRequest(request: any, context: ExecutionContext): boolean {
    console.log('valid');
    console.log(context.getHandler());
    return request.body.authToken === 'login';
  }
}
