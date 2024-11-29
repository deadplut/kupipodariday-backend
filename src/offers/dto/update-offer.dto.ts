import { PartialType } from '@nestjs/mapped-types';
import { CreateOfferDto } from './create-offer.dto';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsInt,
  IsString,
  Matches,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class UpdateOfferDto extends PartialType(CreateOfferDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  item: number;

  @IsOptional()
  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a valid number with up to 2 decimal places',
  })
  amount: string;

  @IsOptional()
  @IsBoolean()
  hidden: boolean;
}
