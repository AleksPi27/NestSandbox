import { Module } from '@nestjs/common';
import { CarModule } from './cars/car.module';
import { RatModule } from './rats/rat.module';

@Module({
  imports: [CarModule, RatModule],
})
export class AppModule {}
