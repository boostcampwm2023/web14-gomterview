import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from '../service/token.service';
import { getTokenValue } from 'src/util/token.util';
import { isEmpty } from 'class-validator';
import { InvalidTokenException } from '../exception/token.exception';

@Injectable()
export class TokenHardGuard extends AuthGuard('jwt') {
  constructor(private tokenService: TokenService) {
    super();
  }

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const token = getTokenValue(request);

    if (isEmpty(token)) {
      throw new InvalidTokenException();
    }

    try {
      request.user = await this.validateToken(token);
      return true;
    } catch (error) {
      throw error;
    }
  }

  private async validateToken(token: string) {
    return await this.tokenService.findMemberByToken(token, true);
  }
}
