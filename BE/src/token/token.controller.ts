import { Controller, Get } from '@nestjs/common';
import { TokenService } from './service/token.service';

@Controller('token')
export class TokenController {
  constructor(private tokenService: TokenService) {}

  @Get()
  async getDevToken() {
    this.tokenService.getDevToken();
  }
}
