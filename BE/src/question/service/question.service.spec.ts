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
import { createIntegrationTestModule } from '../../util/test.util';
import { QuestionModule } from '../question.module';
import { CategoryModule } from '../../category/category.module';
import { Question } from '../entity/question';
import { Category } from '../../category/entity/category';
import { INestApplication } from '@nestjs/common';
import { Member } from '../../member/entity/member';
import { MemberModule } from '../../member/member.module';
import { MemberRepository } from '../../member/repository/member.repository';
import { memberFixture } from '../../member/fixture/member.fixture';

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

  it('질문 추가시, categoryId와 content가 있다면 성공적으로 질문을 추가한다.', async () => {
    //given

    //when
    mockCategoryRepository.findByCategoryId.mockResolvedValue(
      categoryFixtureWithId,
    );
    mockQuestionRepository.save.mockResolvedValue(questionFixture);

    //then
    await expect(
      service.createQuestion(createQuestionRequestFixture, memberFixture),
    ).resolves.toEqual(QuestionResponse.from(questionFixture));
  });

  it('질문 추가시, categoryId가 null이거나, 존재하지 않으면 CategoryNotFoundException을 반환한다.', async () => {
    //given

    //when
    mockCategoryRepository.findByCategoryId.mockResolvedValue(undefined);

    //then
    await expect(
      service.createQuestion(createQuestionRequestFixture, memberFixture),
    ).rejects.toThrow(new CategoryNotFoundException());
  });
});

describe('QuestionService 통합 테스트', () => {
  let app: INestApplication;
  let questionService: QuestionService;
  let categoryRepository: CategoryRepository;
  let questionRepository: QuestionRepository;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const modules = [QuestionModule, CategoryModule, MemberModule];
    const entities = [Question, Category, Member];

    const moduleFixture = await createIntegrationTestModule(modules, entities);
    app = moduleFixture.createNestApplication();
    await app.init();

    questionService = moduleFixture.get<QuestionService>(QuestionService);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  beforeEach(async () => {
    await categoryRepository.query('delete from Question');
    await categoryRepository.query('delete from Category');
    await categoryRepository.query('delete from Member');
  });

  it('새로운 질문을 저장할 때 QuestionResponse객체를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);

    //when

    //then
    await expect(
      questionService.createQuestion(
        createQuestionRequestFixture,
        memberFixture,
      ),
    ).resolves.toEqual(QuestionResponse.from(questionFixture));
  });
});
