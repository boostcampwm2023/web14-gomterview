import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { TokenService } from '../service/token.service';
import { getTokenValue } from 'src/util/token.util';
import { MemberRepository } from 'src/member/repository/member.repository';

@Injectable()
export class TokenHardGuard extends AuthGuard('jwt') {
  constructor(
    private tokenService: TokenService,
    private memberRepository: MemberRepository,
  ) {
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
    const payload = await this.tokenService.getPayload(token);
    return this.memberRepository.findById(payload.id);
  }
}
