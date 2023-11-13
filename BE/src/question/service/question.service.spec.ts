import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionRepository } from '../repository/question.repository';
import { MemberRepository } from '../../member/repository/member.repository';
import { CustomQuestionRequest } from '../dto/customQuestionRequest';
import { ContentEmptyException } from '../exception/question.exception';
import { CategoriesResponse } from '../dto/categoriesResponse';
import { UnauthorizedException } from '@nestjs/common';
import { memberFixture } from '../../member/fixture/member.fixture';
import { questionFixture } from '../fixture/question.fixture';

describe('QuestionService 단위 테스트', () => {
  let service: QuestionService;
  const mockQuestionRepository = {
    save: jest.fn(),
    findCategories: jest.fn(),
    findQuestionByIdAndMember_Id: jest.fn(),
    remove: jest.fn(),
  };

  const mockMemberRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, QuestionRepository, MemberRepository],
    })
      .overrideProvider(QuestionRepository)
      .useValue(mockQuestionRepository)
      .overrideProvider(MemberRepository)
      .useValue(mockMemberRepository)
      .compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('나만의 질문을 저장한다.', async () => {
    const customQuestionRequest = {
      content: 'test content',
    } as CustomQuestionRequest;
    mockQuestionRepository.save.mockResolvedValue(undefined);
    const result = await service.createCustomQuestion(
      customQuestionRequest,
      memberFixture,
    );
    expect(result).toEqual(undefined);
  });

  it('나만의 질문 저장 실패 => content가 없을 때', async () => {
    const customQuestionRequest = {
      content: undefined,
    } as CustomQuestionRequest;
    mockQuestionRepository.save.mockResolvedValue(undefined);
    await expect(
      service.createCustomQuestion(customQuestionRequest, memberFixture),
    ).rejects.toThrow(ContentEmptyException);
  });

  it('카테고리 조회를 한다.', async () => {
    const categories = ['CS', 'BE', 'FE', '나만의 질문'];
    mockQuestionRepository.findCategories.mockReturnValue(categories);
    const result = await service.findCategories();
    expect(result).toEqual(categories);
  });

  /*
  TODO : 카테고리별 질문 조회는 Answer까지 만든 후에, 이를 Question에 합쳐야 하는 문제가 있다. 이로 인해 Answer API생성 후, 해당 API 단위테스트시에 추가할 예정이다.
   */

  it('나만의 질문을 삭제를 실패 => 회원의 id와 Question.id로 조회하지 못할 때', async () => {
    mockQuestionRepository.findQuestionByIdAndMember_Id.mockResolvedValue(
      undefined,
    );
    await expect(service.deleteById(1, memberFixture)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('나만의 질문을 삭제한다', async () => {
    mockQuestionRepository.findQuestionByIdAndMember_Id.mockResolvedValue(
      questionFixture,
    );
    mockQuestionRepository.remove.mockResolvedValue(undefined);
    const result = await service.deleteById(1, memberFixture);
    expect(result).toEqual(undefined);
  });
});
