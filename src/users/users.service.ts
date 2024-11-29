import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByName(name: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { name: name },
    });

    if (!user) {
      throw new NotFoundException(`User with name ${name} not found`);
    }

    return user;
  }

  async findByFields(query: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: [{ name: query }, { email: query }],
    });

    if (!user) {
      throw new NotFoundException(
        `User with name or email "${query}" not found`,
      );
    }

    return user;
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const hashedPassword = await this.hashService.hashPassword(
      updateUserDto.password,
    );
    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    Object.assign(user, { ...updateUserDto, password: hashedPassword });

    return this.userRepository.save(user);
  }

  async removeOne(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}
