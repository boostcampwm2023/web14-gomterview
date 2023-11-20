import { Test, TestingModule } from '@nestjs/testing';
import { CategoryController } from './category.controller';
import { CategoryService } from '../service/category.service';
import {
  memberFixture,
  memberFixturesOAuthRequest,
  mockReqWithMemberFixture,
  oauthRequestFixture,
} from '../../member/fixture/member.fixture';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import {
  CategoryNameEmptyException,
  CategoryNotFoundException,
} from '../exception/category.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { Request } from 'express';
import * as request from 'supertest';
import { CategoryModule } from '../category.module';
import { MemberModule } from '../../member/member.module';
import { Member } from '../../member/entity/member';
import { Category } from '../entity/category';
import { Question } from '../../question/entity/question';
import { createIntegrationTestModule } from '../../util/test.util';
import { AuthModule } from '../../auth/auth.module';
import { TokenModule } from '../../token/token.module';
import { AuthService } from '../../auth/service/auth.service';
import { Token } from '../../token/entity/token';
import {
  categoryFixtureWithId,
  categoryListResponseFixture,
  defaultCategoryListFixture,
  defaultCategoryListResponseFixture,
} from '../fixture/category.fixture';
import { CategoryListResponse } from '../dto/categoryListResponse';
import { TokenService } from '../../token/service/token.service';
import { CategoryRepository } from '../repository/category.repository';
import { UnauthorizedException } from '@nestjs/common';
import { MemberRepository } from '../../member/repository/member.repository';

describe('CategoryController', () => {
  let controller: CategoryController;

  const mockCategoryService = {
    createCategory: jest.fn(),
    findUsingCategories: jest.fn(),
    deleteCategoryById: jest.fn(),
  };

  const mockTokenService = {
    findMemberByToken: jest.fn(),
  };

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
    mockTokenService.findMemberByToken.mockResolvedValue(memberFixture);

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
    mockTokenService.findMemberByToken.mockResolvedValue(undefined);

    //then
    await expect(
      controller.findCategories({ user: undefined } as unknown as Request),
    ).resolves.toEqual(
      CategoryListResponse.of(defaultCategoryListResponseFixture),
    );
  });

  it('Member객체가 있고, 존재하는 id의 삭제를 요청하면, Undefined가 반환된다.', async () => {
    //given
    const category = new Category(1, 'CS', memberFixture, new Date());

    //when
    mockCategoryService.deleteCategoryById.mockResolvedValue(undefined);
    //then
    await expect(
      controller.deleteCategoryById(mockReqWithMemberFixture, category.id),
    ).resolves.toBeUndefined();
  });

  it('Member객체가 없이 id만을 요청하면 ManipulatedToken을 반환한다. => 미들웨어 통과지만 Repository에서 찾지 못한 경우', async () => {
    //given
    const category = new Category(1, 'CS', memberFixture, new Date());

    //when
    mockCategoryService.deleteCategoryById.mockRejectedValue(
      new ManipulatedTokenNotFiltered(),
    );
    //then
    await expect(
      controller.deleteCategoryById(
        { user: undefined } as unknown as Request,
        category.id,
      ),
    ).rejects.toThrow(new ManipulatedTokenNotFiltered());
  });

  it('Member객체가 있지만, id로 조회한 Category의 Member와 다르면 UnauthorizedException을 반환한다.', async () => {
    //given
    const category = new Category(
      1,
      'CS',
      new Member(3, 'ja@ja.com', 'ja', 'http://www.gomterview.com', new Date()),
      new Date(),
    );

    //when
    mockCategoryService.deleteCategoryById.mockRejectedValue(
      new UnauthorizedException(),
    );
    //then
    await expect(
      controller.deleteCategoryById(mockReqWithMemberFixture, category.id),
    ).rejects.toThrow(new UnauthorizedException());
  });

  it('Member객체가 있지만 id로 조회한 Category가 없을 경우 CategoryNotFoundException을 반환한다.', async () => {
    //given
    const category = new Category(
      1,
      'CS',
      new Member(3, 'ja@ja.com', 'ja', 'http://www.gomterview.com', new Date()),
      new Date(),
    );

    //when
    mockCategoryService.deleteCategoryById.mockRejectedValue(
      new CategoryNotFoundException(),
    );
    //then
    await expect(
      controller.deleteCategoryById(mockReqWithMemberFixture, category.id + 1),
    ).rejects.toThrow(new CategoryNotFoundException());
  });
});

describe('CategoryController 통합테스트', () => {
  let app;
  let authService: AuthService;
  let categoryRepository: CategoryRepository;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const modules = [CategoryModule, MemberModule, TokenModule, AuthModule];
    const entities = [Member, Category, Question, Token];
    const moduleFixture = await createIntegrationTestModule(modules, entities);

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  it('카테고리 저장을 성공시 201상태코드가 반환된다.', (done) => {
    authService.login(oauthRequestFixture).then((validToken) => {
      const agent = request.agent(app.getHttpServer());
      agent
        .post('/api/category')
        .set('Cookie', [`accessToken=${validToken}`])
        .send(new CreateCategoryRequest('tester'))
        .expect(201)
        .then(() => done());
    });
  });

  it('회원이 카테고리 조회시 200코드와 CategoryListResponse가 반환된다.', async () => {
    const token = await authService.login(memberFixturesOAuthRequest);
    const member = await memberRepository.findByEmail(
      memberFixturesOAuthRequest.email,
    );
    for (const each of defaultCategoryListFixture) {
      await categoryRepository.save(Category.from(each, member));
    }
    const agent = request.agent(app.getHttpServer());
    agent
      .get(`/api/category`)
      .set('Cookie', [`accessToken=${token}`])
      .expect(200)
      .then((response) => {
        expect(response.body.categoryList).toEqual(categoryListResponseFixture);
      });
  });

  it('비회원이 카테고리 조회시 200코드와 CategoryListResponse가 반환된다.', async () => {
    for (const each of defaultCategoryListFixture) {
      await categoryRepository.save(each);
    }
    const agent = request.agent(app.getHttpServer());
    agent
      .get(`/api/category`)
      .expect(200)
      .then((response) => {
        expect(response.body.categoryList).toEqual(categoryListResponseFixture);
      });
  });

  it('회원의 카테고리를 삭제한다.', async () => {
    //given

    //when

    //then
    await categoryRepository.save(categoryFixtureWithId);
    const token = await authService.login(memberFixturesOAuthRequest);
    const agent = request.agent(app.getHttpServer());
    agent
      .delete(`/api/category?id=1`)
      .set('Cookie', [`accessToken=${token}`])
      .expect(204);
  });

  afterEach(async () => {
    await clearDB(categoryRepository);
  });
});

const clearDB = async (categoryRepository) => {
  await categoryRepository.query('delete from Question');
  await categoryRepository.query('delete from Category');
  await categoryRepository.query('delete from Member');
  await categoryRepository.query('delete from token');
};
