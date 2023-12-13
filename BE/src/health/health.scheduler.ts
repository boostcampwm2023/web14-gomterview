import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import {
  HealthCheckService,
  HttpHealthIndicator,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { LoggerService } from '../config/logger.config';
import 'dotenv/config';

@Injectable()
export class HealthCheckScheduler {
  private readonly dbLogger = new LoggerService('DB');
  private readonly main = new LoggerService('MAIN');

  constructor(
    private health: HealthCheckService,
    private db: TypeOrmHealthIndicator,
    private http: HttpHealthIndicator,
  ) {}

  @Cron('0 * * * * *')
  async checkDB() {
    try {
      await this.health.check([
        async () => await this.db.pingCheck('database'),
      ]);
      this.dbLogger.log(`${new Date()} : ON`);
    } catch (error) {
      this.dbLogger.error(`${new Date()} : OFF`, error.stack);
    }
  }

  @Cron('0 * * * * *')
  async checkMain() {
    try {
      await this.health.check([
        async () =>
          await this.http.pingCheck('gomterview-main', process.env.BE_URL),
      ]);
      this.main.log(`${new Date()} : ON`);
    } catch (error) {
      this.main.error(`${new Date()} : OFF`, error.stack);
    }
  }
}
