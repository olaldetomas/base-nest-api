import { compareSync, genSalt, hash } from 'bcrypt';
import { RegisterUserDto } from 'src/auth/dto/register-user-dto';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload-interface';
import { User } from 'src/users/entities/user.entity';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.getByEmail(registerUserDto.email);
    if (user) {
      throw new BadRequestException('User already exists');
    }
    registerUserDto.password = await this.genHashedPassword(
      registerUserDto.password
    );
    const createdUser = await this.usersService.save(registerUserDto);
    return this.generateToken(createdUser);
  }

  async registerFromGoogle(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.getByEmail(registerUserDto.email);
    if (user) {
      return user;
    }
    return await this.usersService.save(registerUserDto);
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersService.getByEmail(email);
    if (user && compareSync(password, user.password)) {
      return user;
    }
    return null;
  }

  async generateToken(user: User) {
    const payload: JwtPayload = { email: user.email, userId: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async genHashedPassword(password: string): Promise<string> {
    const salt = await genSalt();
    return await hash(password, salt);
  }
}
