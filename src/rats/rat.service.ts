import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Car } from 'src/cars/car.dto';
import { CarService } from 'src/cars/car.service';
import { RatAddDto } from './rat.dto';
import { PayloadTooLargeException } from './rat.exception';
import { Rat } from './rat.interface';

@Injectable()
export class RatService {
  private rats: Rat[] = [];
  private idCounter: number = 0;

  constructor(private readonly carService: CarService) {}

  getAllRats(): Omit<Rat, 'id'>[] {
    return this.rats.map(({ id, ...rest }) => rest);
  }

  getFilteredRats(filterAge: number): Omit<Rat, 'id'>[] {
    return this.rats.filter(({id, ...rest}) => (rest.age <= filterAge)).map(({id,...rest})=> rest);
  }

  createRat(rat: RatAddDto): Rat {
    this.rats.push({ id: this.idCounter, ...rat });
    return this.rats.at(this.idCounter++);
  }

  getRatById(id: number): Rat {
    return this.rats.find((rat) => rat.id === id);
  }

  getAllRatsAndCars(): (Rat | Car)[] {
    let res: (Rat | Car)[] = [...this.rats];
    if (this.carService.getAllCars().length > 0) {
      throw new PayloadTooLargeException();
    }
    return res.concat(this.carService.getAllCars());
  }
}
