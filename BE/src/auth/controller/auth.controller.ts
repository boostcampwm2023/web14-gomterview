import {Controller, Delete, Get, Post, Req, Res, UseGuards} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';
import {OAuthRequest} from '../interface/auth.interface';
import { AuthService } from '../service/auth.service';
import {ApiCreatedResponse, ApiResponse, ApiTags} from "@nestjs/swagger";
import {TokenResponse} from "../dto/tokenResponse";

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
    res.status(201).json({accessToken: await this.authService.login(userRequest)});
  }

  @Delete('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({
    status:204,
    description: '로그아웃 api, 회원의 토큰 정보를 db에서 삭제한다.'
  })
  async logout(@Req() request:Request, @Res() res: Response){
    const token = request.header("Authorization").split(" ").pop();
    await this.authService.logout(token);
    res.status(204).send();
  }
}
