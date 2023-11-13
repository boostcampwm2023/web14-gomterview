import { Test, TestingModule } from '@nestjs/testing';
import {QuestionService} from "./question.service";
import {QuestionRepository} from "../repository/question.repository";
import {MemberRepository} from "../../member/repository/member.repository";
import {CustomQuestionRequest} from "../dto/customQuestionRequest";
import {Member} from "../../member/entity/member";

describe('QuestionService', () => {
  let service: QuestionService;
  const mockQuestionRepository = {
    save: jest.fn(),
  }

  const mockMemberRepository = {}

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, QuestionRepository, MemberRepository],
    }).overrideProvider(QuestionRepository).useValue(mockQuestionRepository)
        .overrideProvider(MemberRepository).useValue(mockMemberRepository)
        .compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('나만의 질문을 저장한다.', async () => {
    const customQuestionRequest = {content: 'test content'} as CustomQuestionRequest;
    const memberFixture:Member = new Member(100, 'test@test.com', 'test', 'http://localhost:8080', new Date());
    mockQuestionRepository.save.mockResolvedValue(undefined);
    const result = await service.createCustomQuestion(customQuestionRequest, memberFixture);
    expect(result).toEqual(undefined);
  })

  it('나만의 질문 저장 실패 => content가 없을 때', async () => {
    const customQuestionRequest = {content: undefined} as CustomQuestionRequest;
    const memberFixture:Member = new Member(100, 'test@test.com', 'test', 'http://localhost:8080', new Date());
    mockQuestionRepository.save.mockResolvedValue(undefined);
    await expect(service.createCustomQuestion(customQuestionRequest, memberFixture))
        .rejects.toThrow(Error);
  })
});
