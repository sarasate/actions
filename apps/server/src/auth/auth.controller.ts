import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local.guard';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() request) {
    return request.user;
  }
}
