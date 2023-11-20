import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionRepository } from '../repository/question.repository';
import {
  createQuestionRequestFixture,
  questionFixture,
} from '../util/question.util';
import { QuestionResponse } from '../dto/questionResponse';
import { CategoryRepository } from '../../category/repository/category.repository';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CategoryNotFoundException } from '../../category/exception/category.exception';
import { ContentNotFoundException } from '../exception/question.exception';

describe('QuestionService', () => {
  let service: QuestionService;

  const mockQuestionRepository = {
    save: jest.fn(),
  };

  const mockCategoryRepository = {
    findByCategoryId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, QuestionRepository, CategoryRepository],
    })
      .overrideProvider(QuestionRepository)
      .useValue(mockQuestionRepository)
      .overrideProvider(CategoryRepository)
      .useValue(mockCategoryRepository)
      .compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('게시글 추가시, categoryId와 content가 있다면 성공적으로 질문을 추가한다.', async () => {
    //given

    //when
    mockCategoryRepository.findByCategoryId.mockResolvedValue(
      categoryFixtureWithId,
    );
    mockQuestionRepository.save.mockResolvedValue(questionFixture);

    //then
    await expect(
      service.createQuestion(createQuestionRequestFixture),
    ).resolves.toEqual(QuestionResponse.from(questionFixture));
  });

  it('게시글 추가시, categoryId가 null이거나, 존재하지 않으면 CategoryNotFoundException을 반환한다.', async () => {
    //given

    //when
    mockCategoryRepository.findByCategoryId.mockResolvedValue(undefined);

    //then
    await expect(
      service.createQuestion(createQuestionRequestFixture),
    ).rejects.toThrow(new CategoryNotFoundException());
  });

  it('게시글 추가시, content가 isEmpty면 ContentNotFoundException을 반환한다.', async () => {
    //given

    //when
    mockCategoryRepository.findByCategoryId.mockResolvedValue(
      categoryFixtureWithId,
    );

    //then
    await expect(
      service.createQuestion(createQuestionRequestFixture),
    ).rejects.toThrow(new ContentNotFoundException());
  });
});
