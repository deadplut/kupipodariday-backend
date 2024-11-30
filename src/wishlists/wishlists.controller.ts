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
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistResponseDto } from './dto/wishlist-response.dto';
import { WishlistsService } from './wishlists.service';

@Controller('wishlists')
export class WishlistsController {
  constructor(
    private readonly wishlistsService: WishlistsService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  async create(
    @Request() req: AuthenticatedRequest,
    @Body() createWishlistDto: CreateWishlistDto,
  ) {
    const user = await this.usersService.findById(req.user.userId);
    return this.wishlistsService.create(createWishlistDto, user);
  }

  @Get()
  async findAll() {
    const wishlist = await this.wishlistsService.findAll();
    return plainToInstance(WishlistResponseDto, wishlist, {
      excludeExtraneousValues: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<WishlistResponseDto> {
    const wishlist = await this.wishlistsService.findById(+id);
    return plainToInstance(WishlistResponseDto, wishlist, {
      excludeExtraneousValues: true,
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateWishlistDto: UpdateWishlistDto,
  ): Promise<WishlistResponseDto> {
    const wish = await this.wishlistsService.updateOne(+id, updateWishlistDto);
    return plainToInstance(WishlistResponseDto, wish, {
      excludeExtraneousValues: true,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.wishlistsService.removeOne(+id);
  }
}
