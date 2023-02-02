import { getUserFromRequest } from 'src/common/utils/user-request';
import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  @UseGuards(JwtAuthGuard)
  @Get('protected')
  async getProfile(@Req() req, @Res() res) {
    const user = await getUserFromRequest(req);
    res.status(200).json(`Valid token for user ${user.email}`);
  }
}
