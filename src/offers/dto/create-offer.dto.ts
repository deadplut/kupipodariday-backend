import { IsBoolean, IsNumber, IsString, Matches } from 'class-validator';

export class CreateOfferDto {
  @IsNumber()
  item: number;

  @IsString()
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Amount must be a valid number with up to 2 decimal places',
  })
  amount: string;

  @IsBoolean()
  hidden: boolean;
}
