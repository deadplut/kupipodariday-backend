import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsString,
  Matches,
} from 'class-validator';

export class CreateOfferDto {
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  user: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  item: number;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a valid number with up to 2 decimal places',
  })
  amount: string;

  @IsBoolean()
  hidden: boolean;
}
