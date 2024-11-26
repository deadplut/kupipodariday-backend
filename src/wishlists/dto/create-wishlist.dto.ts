import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsString,
  IsUrl,
  Length,
  Max,
} from 'class-validator';

export class CreateWishlistDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  user: number;

  @IsString()
  @Length(1, 250)
  name: string;

  @IsString()
  @Max(1500)
  description: string;

  @IsUrl()
  image: string;
}
