import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { AuthenticatedRequest } from 'src/auth/interfaces/authenticated-request.interface';
import { UsersService } from 'src/users/users.service';
import { CreateOfferDto } from './dto/create-offer.dto';
import { offerResponseDto } from './dto/offer-response.dto';
import { UpdateOfferDto } from './dto/update-offer.dto';
import { Offer } from './entities/offer.entity';
import { OffersService } from './offers.service';

@Controller('offers')
export class OffersController {
  constructor(
    private readonly offersService: OffersService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createOfferDto: CreateOfferDto,
  ): Promise<Offer> {
    const user = await this.usersService.findById(req.user.userId);
    return this.offersService.create(createOfferDto, user);
  }

  @Get()
  async findAll(): Promise<offerResponseDto[]> {
    const offers = await this.offersService.findAll();
    return plainToInstance(offerResponseDto, offers, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<offerResponseDto> {
    const offer = await this.offersService.findById(+id);
    return plainToInstance(offerResponseDto, offer, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateOfferDto: UpdateOfferDto,
  ): Promise<Offer> {
    return this.offersService.updateOne(+id, updateOfferDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.offersService.removeOne(+id);
  }
}
