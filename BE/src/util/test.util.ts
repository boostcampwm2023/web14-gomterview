import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions } from 'typeorm';
import {
  DynamicModule,
  INestApplication,
  ValidationPipe,
} from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import {
  addTransactionalDataSource,
  getDataSourceByName,
  initializeTransactionalContext,
} from 'typeorm-transactional';
import { Member } from '../member/entity/member';
import { Category } from '../category/entity/category';
import { Workbook } from '../workbook/entity/workbook';
import { Question } from '../question/entity/question';
import { Answer } from '../answer/entity/answer';
import { Video } from '../video/entity/video';

export const createIntegrationTestModule = async (modules: unknown[]) => {
  const ormModule = await createTypeOrmModuleForTest();
  modules.push(ormModule);

  return await Test.createTestingModule({
    imports: modules as DynamicModule[],
  }).compile();
};

export const addAppModules = (app: INestApplication) => {
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
};

export const createTypeOrmModuleForTest = async () => {
  const module = TypeOrmModule.forRootAsync({
    useFactory() {
      return ormModuleForTest();
    },
    async dataSourceFactory(options) {
      return (
        getDataSourceByName('default') ||
        addTransactionalDataSource(new DataSource(options))
      );
    },
  });
  initializeTransactionalContext();
  return module;
};

export const ormModuleForTest = (): DataSourceOptions => {
  return {
    type: 'sqlite', // 또는 다른 테스트용 데이터베이스 설정
    database: ':memory:',
    entities: [Member, Category, Workbook, Question, Answer, Video],
    synchronize: true,
  };
};
