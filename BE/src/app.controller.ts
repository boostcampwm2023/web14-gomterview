import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getHello() {
    return this.appService.getHello();
  }

  @Get('/initializeDummy')
  async saveDummy() {
    await this.appService.saveDummy();
  }
}
