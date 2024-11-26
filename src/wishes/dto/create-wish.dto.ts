import { Transform, Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsPositive,
  IsString,
  IsUrl,
  Length,
  Matches,
} from 'class-validator';

export class CreateWishDto {
  @IsString()
  @Length(1, 250)
  name: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  owner: number;

  @IsUrl()
  link: string;

  image: string;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a valid number with up to 2 decimal places',
  })
  price: number;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a valid number with up to 2 decimal places',
  })
  raised: number;

  @IsString()
  @Length(1, 1024)
  description: string;

  @IsInt()
  @IsPositive()
  @Transform(({ value }) => parseInt(value, 10))
  copied: number;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  wishlist: number;
}
