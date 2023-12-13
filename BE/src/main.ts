import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { setupSwagger } from './config/swagger.config';
import { CORS_CONFIG } from './config/cors.config';
import * as cookieParser from 'cookie-parser';
import { initializeTransactionalContext } from 'typeorm-transactional';
import { LoggerService } from './config/logger.config';

async function bootstrap() {
  initializeTransactionalContext();
  const app = await NestFactory.create(AppModule, {
    abortOnError: true,
  });
  const expressApp = app.getHttpAdapter().getInstance();
  const logger = new LoggerService('traffic');
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors(CORS_CONFIG);
  setupSwagger(app);
  // 캐시 제어 미들웨어 등록
  expressApp.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-cache');
    logger.info(req.url);
    next();
  });
  await app.listen(8080, '0.0.0.0');
}

bootstrap();
