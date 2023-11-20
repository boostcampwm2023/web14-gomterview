import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionRepository } from '../repository/question.repository';

describe('QuestionService', () => {
  let service: QuestionService;

  const mockQuestionRepository = {
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, QuestionRepository],
    })
      .overrideProvider(QuestionRepository)
      .useValue(mockQuestionRepository)
      .compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
