import { LoggerService as LS } from '@nestjs/common';
import * as winston from 'winston';
import { utilities as nestWinstonModuleUtilities } from 'nest-winston';

const { errors, combine, timestamp, printf } = winston.format;

export class LoggerService implements LS {
  private logger: winston.Logger;

  constructor(service: string) {
    this.logger = winston.createLogger({
      transports: [
        new winston.transports.File({
          level: 'error',
          filename: `error-${getDateForm()}.log`,
          dirname: 'logs',
          maxsize: 5000000,
          format: combine(
            errors({ stack: true }),
            timestamp({ format: 'isoDateTime' }),
            printf((info) => {
              return `${info.message}`;
            }),
          ),
        }),
        new winston.transports.Console({
          level: 'debug',
          format: combine(
            timestamp({ format: 'isoDateTime' }),
            nestWinstonModuleUtilities.format.nestLike(service, {
              prettyPrint: true,
            }),
          ),
        }),

        new winston.transports.File({
          filename: `application-${getDateForm()}.log`,
          dirname: 'logs',
          maxsize: 5000000,
          format: combine(
            timestamp({ format: 'isoDateTime' }),
            printf((info) => {
              return `${info.message}`;
            }),
          ),
        }),
      ],
    });
  }

  log(message: string) {
    this.logger.log({ level: 'info', message });
  }
  info(message: string) {
    this.logger.info(message);
  }
  error(message: string, trace: string) {
    this.logger.error(message, trace);
  }
  warn(message: string) {
    this.logger.warning(message);
  }
  debug(message: string) {
    this.logger.debug(message);
  }
  verbose(message: string) {
    this.logger.verbose(message);
  }
}

const getDateForm = () => {
  const date = new Date();
  return `${date.getFullYear()}_${date.getMonth()}_${date.getDate()}`;
};
