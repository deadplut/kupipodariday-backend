import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateWishDto } from './dto/create-wish.dto';
import { UpdateWishDto } from './dto/update-wish.dto';
import { Wish } from './entities/wish.entity';

@Injectable()
export class WishesService {
  constructor(
    @InjectRepository(Wish)
    private readonly wishRepository: Repository<Wish>,
  ) {}
  async create(createWishDto: CreateWishDto, user: User) {
    const newOffer = await this.wishRepository.save({
      ...createWishDto,
      user: user,
    });
    return newOffer;
  }

  getLast(): Promise<Wish> {
    return this.wishRepository.findOne({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  getTop(): Promise<Wish> {
    return this.wishRepository.findOne({
      order: {
        createdAt: 'ASC',
      },
    });
  }

  findAll() {
    return `This action returns all wishes`;
  }

  findOne(id: number) {
    return `This action returns a #${id} wish`;
  }

  async updateOne(id: number, updateWishDto: UpdateWishDto): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id },
    });

    if (!wish) {
      throw new NotFoundException(`Wish with ID ${id} not found`);
    }

    Object.assign(wish, { ...updateWishDto });

    return this.wishRepository.save(wish);
  }

  async findById(id: number): Promise<Wish> {
    const wish = await this.wishRepository.findOne({
      where: { id: id },
    });

    if (!wish) {
      throw new NotFoundException(`Wish with ID ${id} not found`);
    }

    return wish;
  }

  async removeOne(id: number): Promise<void> {
    const result = await this.wishRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
