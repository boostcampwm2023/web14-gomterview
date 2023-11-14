import { Test } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EntitySchema } from 'typeorm';
import { DynamicModule } from '@nestjs/common';

export const createIntegrationTestModule = async (
  modules: unknown[],
  entities: unknown[],
) => {
  const ormModuleForTest = TypeOrmModule.forRoot({
    type: 'sqlite', // 또는 다른 테스트용 데이터베이스 설정
    database: ':memory:', // 메모리 데이터베이스 사용
    entities: entities as (string | EntitySchema<any>)[],
    synchronize: true,
  });

  modules.push(ormModuleForTest);

  return await Test.createTestingModule({
    imports: modules as DynamicModule[],
  }).compile();
};
