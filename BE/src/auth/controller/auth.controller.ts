import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import {OAuthRequest} from '../dto/auth.interface';
import { AuthService } from '../service/auth.service';
import {ApiCreatedResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TokenResponse} from "../dto/auth.dto";

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  @ApiCreatedResponse({description: '회원가입을 위한 요청 api'})
  async oauthByGoogle(): Promise<void> {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiResponse({
    status:201,
    description: '회원가입을 위한 응답 api',
    type: TokenResponse
  })
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { user } = req;
    const userRequest = user as OAuthRequest;
    res.json({accessToken: await this.authService.login(userRequest)});
  }
}
