import { PartialType } from '@nestjs/mapped-types';
import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Length,
  Max,
} from 'class-validator';
import { CreateWishlistDto } from './create-wishlist.dto';

export class UpdateWishlistDto extends PartialType(CreateWishlistDto) {
  @IsOptional()
  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  user?: number;

  @IsOptional()
  @IsString()
  @Length(1, 250)
  name?: string;

  @IsOptional()
  @IsString()
  @Max(1500)
  description?: string;

  @IsOptional()
  @IsUrl()
  image?: string;
}
