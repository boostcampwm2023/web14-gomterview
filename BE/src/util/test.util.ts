import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, EntitySchema } from 'typeorm';
import {
  DynamicModule,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import {
  addTransactionalDataSource,
  initializeTransactionalContext,
} from 'typeorm-transactional';

export const createIntegrationTestModule = async (
  modules: unknown[],
  entities: unknown[],
) => {
  const ormModule = await createTypeOrmModuleForTest(entities);
  modules.push(ormModule);

  return await Test.createTestingModule({
    imports: modules as DynamicModule[],
  }).compile();
};

export const addAppModules = (app: INestApplication) => {
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
};

export const createTypeOrmModuleForTest = async (entities: unknown[]) => {
  const module = TypeOrmModule.forRootAsync({
    useFactory() {
      return ormModuleForTest(entities);
    },
    async dataSourceFactory(options) {
      if (!options) {
        throw new Error('Invalid options passed');
      }

      return addTransactionalDataSource(new DataSource(options));
    },
  });
  initializeTransactionalContext();
  return module;
};

export const ormModuleForTest = (entities: unknown[]): DataSourceOptions => {
  return {
    type: 'sqlite', // 또는 다른 테스트용 데이터베이스 설정
    database: ':memory:',
    entities: entities as (string | EntitySchema<any>)[],
    synchronize: true,
  };
};
