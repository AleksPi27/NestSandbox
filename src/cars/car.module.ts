import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerMiddleware } from 'src/common/logger.middleware';
import { CarController } from './car.controller';
import { CARS_ROUTE } from './car.interface';
import { CarService } from './car.service';

@Global()
@Module({
  providers: [CarService],
  controllers: [CarController],
  exports: [CarService],
})
export class CarModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CARS_ROUTE);
  }
}
