import { Injectable } from '@nestjs/common';
import { AddCarDto, Car } from './car.dto';

@Injectable()
export class CarService {
  private id: number = 0;
  private cars: Car[] = [];
  create(car: AddCarDto): number {
    return this.cars.push({ id: this.id++, ...car });
  }

  delete(model: string): number[] {
    console.log(this.cars);
    return this.cars
      .splice(
        this.cars.findIndex((car) => car.model === model),
        1,
      )
      .reduce((acc: number[], car) => {
        acc.push(car.id);
        return acc;
      }, []);
  }

  getAllCars(): Car[] {
    return this.cars;
  }
}
