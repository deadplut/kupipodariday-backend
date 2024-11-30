import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { Wishlist } from './entities/wishlist.entity';

@Injectable()
export class WishlistsService {
  constructor(
    @InjectRepository(Wishlist)
    private readonly wishlistRepository: Repository<Wishlist>,
  ) {}

  create(createWishlistDto: CreateWishlistDto, user: User): Promise<Wishlist> {
    const wishlist = this.wishlistRepository.create(createWishlistDto);
    return this.wishlistRepository.save({ ...wishlist, user: user });
  }

  findAll(): Promise<Wishlist[]> {
    return this.wishlistRepository.find();
  }

  async findById(id: number): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id: id },
    });

    if (!wishlist) {
      throw new NotFoundException(`wishlist with ID ${id} not found`);
    }

    return wishlist;
  }

  async updateOne(
    id: number,
    updateWishlistDto: UpdateWishlistDto,
  ): Promise<Wishlist> {
    const wishlist = await this.wishlistRepository.findOne({
      where: { id },
    });

    if (!wishlist) {
      throw new NotFoundException(`Offer with ID ${id} not found`);
    }

    Object.assign(wishlist, updateWishlistDto);

    return this.wishlistRepository.save(wishlist);
  }

  async removeOne(id: number): Promise<void> {
    const result = await this.wishlistRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`wishlist with ID ${id} not found`);
    }
  }
}
