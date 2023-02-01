import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersRepository } from 'src/users/users.repository';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private usersRepository: UsersRepository) {}

  async save(createUserDto: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(createUserDto);
  }

  async getUserById(id: number): Promise<User | null> {
    return await this.usersRepository.getUserById(id);
  }

  async getByEmail(email: string): Promise<User | null> {
    return await this.usersRepository.getByEmail(email);
  }
}
