import { CategoryService } from './category.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CategoryRepository } from '../repository/category.repository';
import { Category } from '../entity/category';
import { CategoryResponse } from '../dto/categoryResponse';
import { INestApplication } from '@nestjs/common';
import {
  addAppModules,
  createIntegrationTestModule,
  createTypeOrmModuleForTest,
} from '../../util/test.util';
import { CategoryModule } from '../category.module';

describe('CategoryService 단위 테스트', () => {
  let categoryService: CategoryService;

  const mockCategoryRepository = {
    findAll: jest.fn(),
    save: jest.fn(),
  };

  jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),
  }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [await createTypeOrmModuleForTest()],
      providers: [CategoryService, CategoryRepository],
    })
      .overrideProvider(CategoryRepository)
      .useValue(mockCategoryRepository)
      .compile();

    categoryService = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  it('카테고리 조회시에 저장되어있는 모든 카테고리가 나온다', async () => {
    //given
    const categories = [Category.of('BE'), Category.of('FE')];

    //when
    mockCategoryRepository.findAll.mockResolvedValue(categories);
    const response = await categoryService.findUsingCategories();

    //then
    expect(response).toBeInstanceOf(Array);
    expect(response[0].id).toBe(categories[0].id);
    expect(response[0].name).toBe(categories[0].name);
    expect(response[0]).toBeInstanceOf(CategoryResponse);
  });
});

describe('CategoryService 통합 테스트', () => {
  let app: INestApplication;
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    const modules = [CategoryModule];

    const moduleFixture: TestingModule =
      await createIntegrationTestModule(modules);

    app = moduleFixture.createNestApplication();
    addAppModules(app);
    await app.init();

    categoryService = moduleFixture.get<CategoryService>(CategoryService);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
  });

  it('should be defined', () => {
    expect(categoryService).toBeDefined();
  });

  it('저장된 카테고리가 조회되어야 한다', async () => {
    //given
    const categories = [
      await categoryRepository.save(Category.of('BE')),
      await categoryRepository.save(Category.of('FE')),
    ];

    //when
    const response = await categoryService.findUsingCategories();

    //then
    for (let index = 0; index < response.length; index++) {
      expect(response[index]).toBeInstanceOf(CategoryResponse);
      expect(response[index].id).toBe(categories[index].id);
      expect(response[index].name).toBe(categories[index].name);
    }
  });
});
