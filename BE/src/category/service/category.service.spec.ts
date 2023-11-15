import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { MemberRepository } from '../../member/repository/member.repository';
import { CategoryRepository } from '../repository/category.repository';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryRepository = {
    save: jest.fn(),
    findCategories: jest.fn(),
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

  it('카테고리 저장을 성공시 undefined로 반환된다.', () => {});

  it('카테고리 저장시, name이 없으면 CategoryNameEmptyException을 반환한다.', () => {});

  it('카테고리 저장시 회원 객체가 없으면 UnauthorizedException을 반환한다.', () => {});
});
