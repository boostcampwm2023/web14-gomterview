import { Module } from '@nestjs/common';
import { JwtService } from './service/jwt.service';

@Module({
  providers: [JwtService]
})
export class JwtModule {}
