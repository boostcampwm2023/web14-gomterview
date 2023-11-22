import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { MemberRepository } from '../../member/repository/member.repository';
import { CategoryRepository } from '../repository/category.repository';
import { memberFixture } from '../../member/fixture/member.fixture';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import {
  CategoryNameEmptyException,
  CategoryNotFoundException,
} from '../exception/category.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { createIntegrationTestModule } from '../../util/test.util';
import { CategoryModule } from '../category.module';
import { MemberModule } from '../../member/member.module';
import { Member } from '../../member/entity/member';
import { Category } from '../entity/category';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { Question } from '../../question/entity/question';
import { CategoryResponse } from '../dto/categoryResponse';
import {
  beCategoryFixture,
  csCategoryFixture,
  customCategoryFixture,
  feCategoryFixture,
} from '../fixture/category.fixture';
import { Answer } from '../../answer/entity/answer';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryRepository = {
    save: jest.fn(),
    findAllByMemberId: jest.fn(),
    findByCategoryId: jest.fn(),
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

  it('나의 카테고리를 조회할 때, {id:number, name:string}구조의 배열이 온다.', async () => {
    //given
    const categoryFixtures = [
      Category.from(beCategoryFixture, memberFixture),
      Category.from(csCategoryFixture, memberFixture),
      Category.from(feCategoryFixture, memberFixture),
      Category.from(customCategoryFixture, memberFixture),
    ];

    //when
    mockCategoryRepository.findAllByMemberId.mockResolvedValue(
      categoryFixtures,
    );

    //then
    await expect(service.findUsingCategories(memberFixture)).resolves.toEqual(
      categoryFixtures.map(CategoryResponse.from),
    );
  });

  it('member가 undefined일 때, [CS, BE, FE, "나만의 질문"]이 {id:number, name:string}구조의 배열로 온다.', async () => {
    //given
    const categoryFixtures = [
      beCategoryFixture,
      csCategoryFixture,
      feCategoryFixture,
      customCategoryFixture,
    ];

    //when
    mockCategoryRepository.findAllByMemberId.mockResolvedValue(
      categoryFixtures,
    );

    //then
    await expect(service.findUsingCategories(undefined)).resolves.toEqual(
      categoryFixtures.map(CategoryResponse.from),
    );
  });

  it('member가 있고, category가 회원의 카테고리라면 성공적으로 삭제를 한다.', async () => {
    //given

    //when
    mockCategoryRepository.findByCategoryId.mockResolvedValue(
      Category.from(beCategoryFixture, memberFixture),
    );
    mockCategoryRepository.remove.mockResolvedValue(undefined);

    //then
    await expect(
      service.deleteCategoryById(memberFixture, beCategoryFixture.id),
    ).resolves.toBeUndefined();
  });

  it('member가 undefined라면 ManipulatedTokenException을 발생시킨다.', async () => {
    //given

    //when
    mockCategoryRepository.findByCategoryId.mockResolvedValue(
      Category.from(beCategoryFixture, memberFixture),
    );

    //then
    await expect(
      service.deleteCategoryById(undefined, beCategoryFixture.id),
    ).rejects.toThrow(new ManipulatedTokenNotFiltered());
  });

  it('categoryId가 존재하지 않는 id라면, CategoryNotFoundException을 발생시킨다.', async () => {
    //given

    //when
    mockCategoryRepository.findByCategoryId.mockResolvedValue(undefined);

    //then
    await expect(
      service.deleteCategoryById(memberFixture, beCategoryFixture.id),
    ).rejects.toThrow(new CategoryNotFoundException());
  });

  it('categoryId가 존재하지만, 자신의 카테고리가 아니라면 UnauthorizedException을 발생시킨다.', async () => {
    //given

    //when
    mockCategoryRepository.findByCategoryId.mockResolvedValue(
      Category.from(
        beCategoryFixture,
        new Member(20, 'ja@ja.com', 'ja', 'https://www.google.com', new Date()),
      ),
    );

    //then
    await expect(
      service.deleteCategoryById(memberFixture, beCategoryFixture.id),
    ).rejects.toThrow(new UnauthorizedException());
  });
});

describe('CategoryService 통합테스트', () => {
  let app: INestApplication;
  let categoryService: CategoryService;
  let categoryRepository: CategoryRepository;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const modules = [CategoryModule, MemberModule];
    const entities = [Member, Category, Question, Answer];
    const moduleFixture = await createIntegrationTestModule(modules, entities);

    app = moduleFixture.createNestApplication();
    await app.init();

    categoryService = moduleFixture.get<CategoryService>(CategoryService);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  const saveDefaultCategory = async () => {
    await categoryRepository.save(csCategoryFixture);
    await categoryRepository.save(beCategoryFixture);
    await categoryRepository.save(feCategoryFixture);
    await categoryRepository.save(customCategoryFixture);
  };

  const saveMembersCategory = async (member: Member) => {
    await categoryRepository.save(Category.from(csCategoryFixture, member));
    await categoryRepository.save(Category.from(beCategoryFixture, member));
    await categoryRepository.save(Category.from(feCategoryFixture, member));
    await categoryRepository.save(Category.from(customCategoryFixture, member));
  };

  it('회원 정보 저장을 성공한다.', async () => {
    //given
    await memberRepository.save(memberFixture);

    //when
    const result = await categoryService.createCategory(
      new CreateCategoryRequest('tester'),
      memberFixture,
    );
    const category = await categoryRepository.findAllByMemberId(
      memberFixture.id,
    );

    //then
    expect(result.name).toEqual('tester');
    expect(category.pop().name).toEqual('tester');
  });

  it('회원의 카테고리를 조회한다.', async () => {
    //given
    await memberRepository.save(memberFixture);

    //when
    await saveMembersCategory(memberFixture);
    await saveDefaultCategory();
    const result = await categoryService.findUsingCategories(memberFixture);

    //then
    expect(result.map((response) => response.name)).toEqual([
      'CS',
      'BE',
      'FE',
      '나만의 질문',
    ]);
  });

  it('비회원의 카테고리를 조회한다.', async () => {
    //given
    await memberRepository.save(memberFixture);

    //when
    await saveMembersCategory(memberFixture);
    await saveDefaultCategory();
    const result = await categoryService.findUsingCategories(null);

    //then
    expect(result.map((response) => response.name)).toEqual([
      'CS',
      'BE',
      'FE',
      '나만의 질문',
    ]);
  });

  it('회원 카테고리를 삭제한다.', async () => {
    //given
    await memberRepository.save(memberFixture);

    //when
    await saveMembersCategory(memberFixture);
    await saveDefaultCategory();
    const categoryId = (
      await categoryService.findUsingCategories(memberFixture)
    ).pop().id;

    //then
    await expect(
      categoryService.deleteCategoryById(memberFixture, categoryId),
    ).resolves.toBeUndefined();
  });

  afterEach(async () => {
    await categoryRepository.query('delete from Category');
    await categoryRepository.query('delete from Member');
  });

  afterAll(async () => {
    await app.close();
  });
});
