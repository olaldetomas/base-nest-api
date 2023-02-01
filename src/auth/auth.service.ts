import { RegisterUserDto } from 'src/auth/dto/register-user-dto';
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
    return await this.usersService.save(registerUserDto);
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
    if (user && user.password === password) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async generateToken(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
