import { ModuleMetadata } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';

export const createTestModuleFixture = async (
  imports: unknown,
  controllers: unknown,
  providers: unknown,
) => {
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: imports,
    controllers: controllers,
    providers: providers,
  } as ModuleMetadata).compile();

  return moduleFixture;
};
