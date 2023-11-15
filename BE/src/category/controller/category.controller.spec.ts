import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../service/category.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategoryService = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .compile();

    controller = module.get<CategoryController>(CategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('카테고리 저장을 성공시 200상태코드가 반환된다.', () => {});

  it('카테고리 저장시, name이 없으면 CategoryNameEmptyException을 반환한다.', () => {});

  it('카테고리 저장시 회원 객체가 없으면 UnauthorizedException을 반환한다.', () => {});
});
