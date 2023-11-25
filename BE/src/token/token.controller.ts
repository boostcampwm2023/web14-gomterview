import { Controller, Get, Res } from '@nestjs/common';
import { TokenService } from './service/token.service';
import { Response } from 'express';
import { BEARER_PREFIX } from 'src/constant/constant';

@Controller('/api/token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get()
  async getDevToken(@Res() res: Response) {
    const devToken = await this.tokenService.getDevToken();
    res.setHeader('Authorization', `${BEARER_PREFIX} ${devToken}`).send();
  }
}
