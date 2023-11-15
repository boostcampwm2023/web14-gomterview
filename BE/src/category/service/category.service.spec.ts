import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { MemberRepository } from '../../member/repository/member.repository';
import { CategoryRepository } from '../repository/category.repository';
import { memberFixture } from '../../member/fixture/member.fixture';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { CategoryNameEmptyException } from '../exception/category.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { createIntegrationTestModule } from '../../util/test.util';
import { CategoryModule } from '../category.module';
import { MemberModule } from '../../member/member.module';
import { Member } from '../../member/entity/member';
import { Category } from '../entity/category';
import { INestApplication } from '@nestjs/common';
import { Question } from '../../question/entity/question';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryRepository = {
    save: jest.fn(),
    findAllByMemberId: jest.fn(),
    remove: jest.fn(),
  };

  const mockMemberRepository = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryService, MemberRepository, CategoryRepository],
    })
      .overrideProvider(CategoryRepository)
      .useValue(mockCategoryRepository)
      .overrideProvider(MemberRepository)
      .useValue(mockMemberRepository)
      .compile();

    service = module.get<CategoryService>(CategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('카테고리 저장을 성공시 undefined로 반환된다.', async () => {
    //given
    const member = memberFixture;
    const request = new CreateCategoryRequest('testCategory');

    //when
    mockCategoryRepository.save.mockResolvedValue(undefined);

    //then
    await expect(
      service.createCategory(request, member),
    ).resolves.toBeUndefined();
  });

  it('카테고리 저장시, name이 없으면 CategoryNameEmptyException을 반환한다.', async () => {
    const member = memberFixture;
    const request = new CreateCategoryRequest(undefined);

    //when

    //then
    await expect(service.createCategory(request, member)).rejects.toThrow(
      new CategoryNameEmptyException(),
    );
  });

  it('카테고리 저장시 회원 객체가 없으면 UnauthorizedException을 반환한다.', () => {
    const request = new CreateCategoryRequest('test name');

    //when

    //then
    expect(service.createCategory(request, undefined)).rejects.toThrow(
      new ManipulatedTokenNotFiltered(),
    );
  });
});

describe('CategoryService 통합테스트', () => {
  let app: INestApplication;
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepository;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const modules = [CategoryModule, MemberModule];
    const entities = [Member, Category, Question];
    const moduleFixture = await createIntegrationTestModule(modules, entities);

    app = moduleFixture.createNestApplication();
    await app.init();

    categoryService = moduleFixture.get<CategoryService>(CategoryService);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  it('회원 정보 저장을 성공한다.', async () => {
    //given
    await memberRepository.save(memberFixture);

    //when
    const result = await categoryService.createCategory(
      new CreateCategoryRequest('tester'),
      memberFixture,
    );
    const category = (
      await categoryRepository.findAllByMemberId(memberFixture.id)
    ).pop();

    //then
    expect(result).toBeUndefined();
    expect(category.name).toEqual('tester');
  });

  afterEach(async () => {
    await categoryRepository.query('delete from Category');
    await categoryRepository.query('delete from Member');
  });

  afterAll(async () => {
    await app.close();
  });
});
