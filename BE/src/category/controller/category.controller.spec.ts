import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../service/category.service';
import {
  memberFixture,
  mockReqWithMemberFixture,
  oauthRequestFixture,
} from '../../member/fixture/member.fixture';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { CategoryNameEmptyException } from '../exception/category.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { Request } from 'express';
import * as request from 'supertest';
import { CategoryModule } from '../category.module';
import { MemberModule } from '../../member/member.module';
import { Member } from '../../member/entity/member';
import { Category } from '../entity/category';
import { Question } from '../../question/entity/question';
import { createIntegrationTestModule } from '../../util/test.util';
import { MemberRepository } from '../../member/repository/member.repository';
import { AuthModule } from '../../auth/auth.module';
import { TokenModule } from '../../token/token.module';
import { AuthService } from '../../auth/service/auth.service';
import { Token } from '../../token/entity/token';
import {
  categoryListResponseFixture,
  defaultCategoryListResponseFixture,
} from '../fixture/category.fixture';
import { CategoryListResponse } from '../dto/categoryListResponse';
import { TokenService } from '../../token/service/token.service';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategoryService = {
    createCategory: jest.fn(),
    findUsingCategories: jest.fn(),
  };

  const mockTokenService = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryController],
      providers: [CategoryService, TokenService],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
      .overrideProvider(TokenService)
      .useValue(mockTokenService)
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

  it('Member객체가 있고, 회원의 카테고리를 조회할 때, CategoryListResponse 객체 형태로 조회된다. ', async () => {
    //given

    //when
    mockCategoryService.findUsingCategories.mockResolvedValue(
      categoryListResponseFixture,
    );

    //then
    await expect(
      controller.findCategories(mockReqWithMemberFixture),
    ).resolves.toEqual(CategoryListResponse.of(categoryListResponseFixture));
  });

  it('Member객체 없이, 회원의 카테고리를 조회할 때, CategoryListResponse 객체 형태로 조회된다. ', async () => {
    //given

    //when
    mockCategoryService.findUsingCategories.mockResolvedValue(
      defaultCategoryListResponseFixture,
    );

    //then
    await expect(controller.findCategories(undefined)).resolves.toEqual(
      CategoryListResponse.of(defaultCategoryListResponseFixture),
    );
  });
});

describe('CategoryController 통합테스트', () => {
  let app;
  let authService: AuthService;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const modules = [CategoryModule, MemberModule, TokenModule, AuthModule];
    const entities = [Member, Category, Question, Token];
    const moduleFixture = await createIntegrationTestModule(modules, entities);

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  it('카테고리 저장을 성공시 201상태코드가 반환된다.', (done) => {
    memberRepository
      .save(memberFixture)
      .then(() => {
        return authService.login(oauthRequestFixture);
      })
      .then((token) => {
        request
          .agent(app.getHttpServer())
          .post(`/api/category`)
          .set('Cookie', [`accessToken=${token}`])
          .send(new CreateCategoryRequest('tester'))
          .expect(201);
      })
      .then((response) => {
        expect(response).toBeUndefined();
        done();
      });
  });
});
