// auth.guard.ts

import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from '../service/token.service';

@Injectable()
export class TokenSoftGuard extends AuthGuard('jwt') {
  constructor(private tokenService: TokenService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = request.cookies['accessToken'];

    // validate 메소드 내에서 토큰을 사용
    request.user = await this.validateToken(token);

    return true;
  }

  private async validateToken(token: string) {
    try {
      return this.tokenService.findMemberByToken(token.replace('Bearer ', ''));
    } catch (error) {
      return null;
    }
  }
}
