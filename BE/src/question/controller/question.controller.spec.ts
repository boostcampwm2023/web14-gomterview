import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from '../service/question.service';
import { TokenService } from '../../token/service/token.service';
import { CustomQuestionRequest } from '../dto/customQuestionRequest';
import { mockReqWithMemberFixture } from '../../member/fixture/member.fixture';
import { Request } from 'express';
import { ContentEmptyException } from '../exception/question.exception';

describe('QuestionController', () => {
  let controller: QuestionController;

  const mockQuestionService = {
    createCustomQuestion: jest.fn(),
  };

  const mockTokenService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, TokenService],
      controllers: [QuestionController],
    })
      .overrideProvider(QuestionService)
      .useValue(mockQuestionService)
      .overrideProvider(TokenService)
      .useValue(mockTokenService)
      .compile();

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('커스텀 질문을 생성할 때 토큰이 있고, body의 content가 문자열로 존재한다면 성공적으로 저장된다.', async () => {
    mockQuestionService.createCustomQuestion.mockResolvedValue(undefined);

    const body = { content: 'test content' } as CustomQuestionRequest;
    const result = await controller.createCustomQuestion(
      mockReqWithMemberFixture as unknown as Request,
      body,
    );
    expect(result).toEqual(undefined);
  });

  /*
  TODO: 카테고리별 질문 조회는 후에 Answer API를 생성 후에, Default Answer까지 붙여서 한번에 테스트하기 위해 보류
   */

  it('커스텀 질문 생성 실패 => body === undefined | "" | null', async () => {
    const arr = [undefined, '', null];
    arr.forEach(async (value) => {
      const body = { content: value } as CustomQuestionRequest;

      mockQuestionService.createCustomQuestion.mockRejectedValue(
        new ContentEmptyException(),
      );

      await expect(
        controller.createCustomQuestion(
          mockReqWithMemberFixture as unknown as Request,
          body,
        ),
      ).rejects.toThrow(ContentEmptyException);
    });
  });
});
