import { Body, Controller, Delete, Inject, Param, Post } from '@nestjs/common';
import { AddCarDto } from './car.dto';
import { CARS_ROUTE } from './car.interface';
import { CarService } from './car.service';

@Controller({ path: CARS_ROUTE, host: ['localhost', '127.0.0.1'] })
export class CarController {
  @Inject()
  private readonly carService: CarService;
  // constructor(private carService: CarService){}
  @Post('/add')
  add(@Body() addCarDto: AddCarDto): number {
    return this.carService.create(addCarDto);
  }
  @Delete('/delete/:model')
  delete(@Param('model') model: string): number[] {
    console.log(model);
    return this.carService.delete(model);
  }
}
