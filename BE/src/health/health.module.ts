import { Logger, Module } from '@nestjs/common';
import {
  HealthCheckService,
  TerminusModule,
  TypeOrmHealthIndicator,
} from '@nestjs/terminus';
import { HttpModule } from '@nestjs/axios';
import { HealthCheckExecutor } from '@nestjs/terminus/dist/health-check/health-check-executor.service';
import { LoggerService } from '../config/logger.config';
import { ScheduleModule } from '@nestjs/schedule';
import { HealthCheckScheduler } from './health.scheduler';

const logger = new LoggerService('healthcheck');

@Module({
  imports: [TerminusModule, HttpModule, ScheduleModule.forRoot()],
  providers: [
    HealthCheckScheduler,
    HealthCheckService,
    TypeOrmHealthIndicator,
    HealthCheckExecutor,
    {
      provide: 'TERMINUS_ERROR_LOGGER',
      useValue: Logger.error.bind(logger),
    },
    {
      provide: 'TERMINUS_LOGGER',
      useValue: logger,
    },
  ],
  controllers: [],
})
export class HealthModule {}
