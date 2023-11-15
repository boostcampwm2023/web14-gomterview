import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from './category.service';
import { MemberRepository } from '../../member/repository/member.repository';
import { CategoryRepository } from '../repository/category.repository';

describe('CategoryService', () => {
  let service: CategoryService;

  const mockCategoryRepository = {
    save: jest.fn(),
    findCategories: jest.fn(),
    findQuestionByIdAndMember_Id: jest.fn(),
    remove: jest.fn(),
  };

  const mockMemberRepository = {};

  beforeEach(async () => {
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
});
