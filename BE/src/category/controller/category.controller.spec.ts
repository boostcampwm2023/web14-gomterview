import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../service/category.service';
import { mockReqWithMemberFixture } from '../../member/fixture/member.fixture';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { CategoryNameEmptyException } from '../exception/category.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { Request } from 'express';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategoryService = {
    createCategory: jest.fn(),
  };

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

  it('카테고리 저장을 성공시 undefined를 반환한다.', async () => {
    //given

    //when
    mockCategoryService.createCategory.mockResolvedValue(undefined);

    //then
    await expect(
      controller.createCategory(
        mockReqWithMemberFixture,
        new CreateCategoryRequest('tester'),
      ),
    ).resolves.toBeUndefined();
  });

  it('카테고리 저장시, body가 isEmpty라면 CategoryNameEmptyException을 반환한다.', async () => {
    //given

    //when
    mockCategoryService.createCategory.mockRejectedValue(
      new CategoryNameEmptyException(),
    );

    //then
    await expect(
      controller.createCategory(
        mockReqWithMemberFixture,
        new CreateCategoryRequest(undefined),
      ),
    ).rejects.toThrow(new CategoryNameEmptyException());
  });

  it('카테고리 저장시 회원 객체가 없으면 ManipulatedTokenException을 반환한다.', async () => {
    //given

    //when
    mockCategoryService.createCategory.mockRejectedValue(
      new ManipulatedTokenNotFiltered(),
    );

    //then
    await expect(
      controller.createCategory(
        { user: null } as unknown as Request,
        new CreateCategoryRequest('tester'),
      ),
    ).rejects.toThrow(new ManipulatedTokenNotFiltered());
  });
});

describe('CategoryController 통합테스트', () => {
  it('카테고리 저장을 성공시 200상태코드가 반환된다.', () => {});

  it('카테고리 저장시, name이 없으면 CategoryNameEmptyException을 반환한다.', () => {});

  it('카테고리 저장시 회원 객체가 없으면 UnauthorizedException을 반환한다.', () => {});
});
