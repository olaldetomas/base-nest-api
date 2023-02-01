import { Controller, Get, Request, Response, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('protected')
  getProfile(@Request() req, @Response() res) {
    res.status(200).json('asd');
  }
}
