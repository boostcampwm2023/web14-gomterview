import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { MemberRepository } from '../../member/repository/member.repository';
import { CategoryRepository } from '../repository/category.repository';
import { memberFixture } from '../../member/fixture/member.fixture';
import { CreateCategoryRequest } from '../dto/createCategoryRequest';
import { CategoryNameEmptyException } from '../exception/category.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';

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
