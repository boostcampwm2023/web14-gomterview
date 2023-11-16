import {
  Controller,
  Delete,
  Get,
  Patch,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CookieOptions, Request, Response } from 'express';
import { OAuthRequest } from '../interface/auth.interface';
import { AuthService } from '../service/auth.service';
import { ApiCreatedResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getTokenValue } from 'src/util/token.util';
import {
  createApiResponseOption,
  createApiResponseOptionWithHeaders,
} from 'src/util/swagger.util';

@Controller('/api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Get('login')
  @UseGuards(AuthGuard('google'))
  @ApiCreatedResponse({
    description: '회원가입을 위한 요청 api, 구글 로그인 페이지로 리다이렉트',
  })
  async oauthByGoogle(): Promise<void> {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  @ApiResponse(
    createApiResponseOptionWithHeaders(
      201,
      '로그인 응답 api, access token을 쿠키에 담아 반환한다.',
      {
        'Set-Cookie': {
          description: 'Access Token Cookie',
          schema: { type: 'string' },
        },
      },
    ),
  )
  async googleAuthCallback(
    @Req() req: Request,
    @Res() res: Response,
  ): Promise<void> {
    const { user } = req;
    const userRequest = user as OAuthRequest;
    res
      .status(201)
      .cookie(
        'accessToken',
        await this.authService.login(userRequest),
        COOKIE_OPTIONS,
      )
      .redirect('https://www.gomterview.com/mypage');
  }

  @Delete('logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse(
    createApiResponseOption(
      200,
      '로그아웃 api, 회원의 토큰 정보를 db에서 삭제한다.',
      undefined,
    ),
  )
  async logout(@Req() request: Request, @Res() res: Response) {
    await this.authService.logout(getTokenValue(request));
    res.status(204).send();
  }

  @Patch('reissue')
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse(
    createApiResponseOptionWithHeaders(
      200,
      '토큰 재발행 api, 새로운 access token을 쿠키에 담아 반환한다.',
      {
        'Set-Cookie': {
          description: 'Access Token Cookie',
          schema: { type: 'string' },
        },
      },
    ),
  )
  async reissue(@Req() request: Request, @Res() res: Response) {
    res
      .cookie(
        'accessToken',
        await this.authService.reissue(getTokenValue(request)),
        COOKIE_OPTIONS,
      )
      .send();
  }
}

const COOKIE_OPTIONS: CookieOptions = {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
};
