import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from '../service/token.service';
import { getTokenValue } from 'src/util/token.util';

@Injectable()
export class TokenHardGuard extends AuthGuard('jwt') {
  constructor(private tokenService: TokenService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = getTokenValue(request);

    try {
      request.user = await this.validateToken(token);
      return true;
    } catch (error) {
      throw error;
    }
  }

  private async validateToken(token: string) {
    return this.tokenService.findMemberByToken(token, true);
  }
}
