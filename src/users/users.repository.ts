import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async save(createUserDto: CreateUserDto): Promise<User> {
    const userEntity = this.userRepository.create(createUserDto);
    return await this.userRepository.save(userEntity);
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.userRepository.findOneBy({ id: id.toString() });
  }

  async getByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({
      where: { email },
      select: this.getAllUserColumns(),
    });
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepository.findOne({
      where: { email },
      select: [],
    });
    return user;
  }

  private getAllUserColumns(): (keyof User)[] {
    return this.userRepository.metadata.columns.map(
      col => col.propertyName
    ) as (keyof User)[];
  }
}
