import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MYSQL_OPTION } from './config/typeorm.config';
import { MemberModule } from './member/member.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmModule.forRoot(MYSQL_OPTION), MemberModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
