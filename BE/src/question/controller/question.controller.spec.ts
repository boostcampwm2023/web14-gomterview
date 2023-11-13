import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from '../service/question.service';
import { TokenService } from '../../token/service/token.service';
import { CustomQuestionRequest } from '../dto/customQuestionRequest';

describe('QuestionController', () => {
  let controller: QuestionController;

  const mockQuestionService = {};

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
    const body = { content: 'test content' } as CustomQuestionRequest;
  });
});
