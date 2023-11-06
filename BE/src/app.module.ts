import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MYSQL_OPTION } from './config/typeorm.config';

@Module({
  imports: [TypeOrmModule.forRoot(MYSQL_OPTION)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
