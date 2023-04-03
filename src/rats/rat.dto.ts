import { IsNumber, IsString } from 'class-validator';

export class RatAddDto {
  @IsNumber()
  age: number;
  @IsNumber()
  weight: number;

  @IsString()
  authToken: string;
}
