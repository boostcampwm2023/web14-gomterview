import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from '../repository/category.repository';
import { CategoryResponse } from '../dto/categoryResponse';
import { INestApplication } from '@nestjs/common';
import {
  addAppModules,
  createIntegrationTestModule,
} from '../../util/test.util';
import { CategoryModule } from '../category.module';
import { CategoryController } from './category.controller';
import { CategoryService } from '../service/category.service';
import { categoryListFixture } from '../fixture/category.fixture';
import * as request from 'supertest';

describe('CategoryController 단위 테스트', () => {
  let categoryController: CategoryController;

  const mockCategoryService = {
    findUsingCategories: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService],
      controllers: [CategoryController],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    categoryController = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  it('카테고리조회 api는 카테고리를 전부 조회해줘야한다.', async () => {
    //given
    mockCategoryService.findUsingCategories.mockResolvedValue(
      categoryListFixture.map(CategoryResponse.from),
    );

    //when
    const result = await categoryController.findCategories();

    //then
    result.forEach((value, index) => {
      expect(value).toBeInstanceOf(CategoryResponse);
      expect(value.id).toBe(categoryListFixture[index].id);
      expect(value.name).toBe(categoryListFixture[index].name);
    });
  });
});

describe('CategoryController 통합 테스트', () => {
  let app: INestApplication;
  let categoryController: CategoryController;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    const modules = [CategoryModule];

    const moduleFixture: TestingModule =
      await createIntegrationTestModule(modules);

    app = moduleFixture.createNestApplication();
    addAppModules(app);
    await app.init();

    categoryController =
      moduleFixture.get<CategoryController>(CategoryController);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(categoryController).toBeDefined();
  });

  it('저장된 카테고리가 조회되어야 한다', async () => {
    //given
    const list = await Promise.all(
      categoryListFixture.map(
        async (category) => await categoryRepository.save(category),
      ),
    );

    //when & then
    const agent = request.agent(app.getHttpServer());
    await agent
      .get(`/api/category`)
      .expect(200)
      .then((response) => {
        response.body.forEach((each, index) => {
          expect(each).toBeInstanceOf(Object);
          expect(each.id).toBe(list[index].id);
          expect(each.name).toBe(list[index].name);
        });
      });
  });
});
