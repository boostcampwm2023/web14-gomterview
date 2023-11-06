import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import { OAuthRequest } from '../dto/auth.interface';

@Controller('auth')
export class AuthController {
  @Get('login')
  @UseGuards(AuthGuard('google'))
  async oauthByGoogle(): Promise<void> {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { user } = req;
    const userRequest = user as OAuthRequest;
  }
}
