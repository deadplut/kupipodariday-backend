import { Expose, Type } from 'class-transformer';
import { BaseResponseDto } from 'src/common/entities/base.dto';
import { offerResponseDto } from 'src/offers/dto/offer-response.dto';
import { UserProfileResponseDto } from 'src/users/dto/user-profile-response.dto';

export class WishResponseDto extends BaseResponseDto {
  @Expose()
  name: string;

  @Expose()
  link: string;

  @Expose()
  image: string;

  @Expose()
  price: number;

  @Expose()
  description: string;

  @Expose()
  raised: number;

  @Expose()
  copied: number;

  @Expose()
  @Type(() => UserProfileResponseDto)
  owner: UserProfileResponseDto;

  @Expose()
  @Type(() => offerResponseDto)
  offers: offerResponseDto[];
}
