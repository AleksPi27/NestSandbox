import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { RoleMiddleware } from 'src/auth/user.middleware';
import { ExceptionLogger } from 'src/common/exception-logger.filter';
import { ExceptionFilter } from 'src/common/exception.filter';
import { LoggerMiddleware } from '../common/logger.middleware';
import { RatController } from './rat.controller';
import { RATS_ROUTE } from './rat.interface';
import { RatService } from './rat.service';
import { JoiValidationPipe } from './validation.pipe';

@Module({
  providers: [JoiValidationPipe, RatService, ExceptionLogger, AuthGuard],
  controllers: [RatController],
})
export class RatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RoleMiddleware, LoggerMiddleware).forRoutes(RATS_ROUTE);
  }
}
