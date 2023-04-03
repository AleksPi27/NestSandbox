import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Request,
  UseFilters,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Request as Req } from 'express';
import { Roles } from 'src/roles/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { Car } from 'src/cars/car.dto';
import { ErrorInterceptor } from 'src/common/error.interceptor';
import { ExceptionFilter } from 'src/common/exception.filter';
import { LoggingInterceptor } from 'src/common/logging.interceptor';
import { TransformResponseInterceptor } from 'src/common/transform.interceptor';
import { RatAddDto } from './rat.dto';
import { Rat, RATS_ROUTE } from './rat.interface';
import { RatService } from './rat.service';
import { JoiValidationPipe } from './validation.pipe';

@Controller(RATS_ROUTE)
@UseInterceptors(
  LoggingInterceptor,
  TransformResponseInterceptor,
  ErrorInterceptor,
)
@UseGuards(RolesGuard)
@UseFilters(ExceptionFilter)
export class RatController {
  constructor(private readonly ratService: RatService) {}

  @Get('/filter')
  filterRats(@Query('ageFilter') ageFilter: number): Omit<Rat, 'id'>[] {
    return this.ratService.getFilteredRats(ageFilter);
  }

  @Get('/all')
  showAllRats(): Omit<Rat, 'id'>[] {
    return this.ratService.getAllRats();
  }

  @Get(':id')
  findRat(@Param('id', ParseIntPipe) id: number): Rat {
    return this.ratService.getRatById(id);
  }

  @Post('/create')
  @Roles('scientist')
  add(@Body(new JoiValidationPipe()) rat: RatAddDto, @Request() req: Req): Rat {
    return this.ratService.createRat(rat);
  }

  @Get('/all/combined')
  showBothRatsAndCars(): (Car | Rat)[] {
    try {
      return this.ratService.getAllRatsAndCars();
    } catch (err) {
      console.log(err.initCause());
      throw err;
    }
  }
}
