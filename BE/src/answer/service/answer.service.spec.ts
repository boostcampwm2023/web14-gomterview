import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';
import { AnswerRepository } from '../repository/answer.repository';
import { QuestionRepository } from '../../question/repository/question.repository';
import { Answer } from '../entity/answer';
import { memberFixture } from '../../member/fixture/member.fixture';
import { questionFixture } from '../../question/util/question.util';
import { CreateAnswerRequest } from '../dto/createAnswerRequest';
import { AnswerResponse } from '../dto/answerResponse';
import { QuestionNotFoundException } from '../../question/exception/question.exception';

describe('AnswerService 단위 테스트', () => {
  let service: AnswerService;
  const mockAnswerRepository = {
    save: jest.fn(),
  };
  const mockQuestionRepository = {
    findById: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnswerService, AnswerRepository, QuestionRepository],
    })
      .overrideProvider(AnswerRepository)
      .useValue(mockAnswerRepository)
      .overrideProvider(QuestionRepository)
      .useValue(mockQuestionRepository)
      .compile();

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('답변 추가', () => {
    it('질문에 답변을 추가한다.', async () => {
      //given
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);

      //when
      const answer = Answer.of('test', memberFixture, questionFixture);
      mockAnswerRepository.save.mockResolvedValue(answer);
      const createAnswerRequest = new CreateAnswerRequest(
        questionFixture.id,
        'test',
      );

      //then
      await expect(
        service.addAnswer(createAnswerRequest, memberFixture),
      ).resolves.toEqual(AnswerResponse.from(answer, memberFixture));
    });

    it('질문에 답변을 추가할 때 id로 질문을 확인할 수 없을 때 QuestionNotFoundException을 반환한다.', async () => {
      //given
      mockQuestionRepository.findById.mockRejectedValue(
        new QuestionNotFoundException(),
      );

      //when
      const answer = Answer.of('test', memberFixture, questionFixture);
      mockAnswerRepository.save.mockResolvedValue(answer);
      const createAnswerRequest = new CreateAnswerRequest(
        questionFixture.id,
        'test',
      );

      //then
      await expect(
        service.addAnswer(createAnswerRequest, memberFixture),
      ).rejects.toThrow(new QuestionNotFoundException());
    });
  });
});
