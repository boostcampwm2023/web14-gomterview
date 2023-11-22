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
import { INestApplication } from '@nestjs/common';
import { CategoryRepository } from '../../category/repository/category.repository';
import { MemberRepository } from '../../member/repository/member.repository';
import { CategoryModule } from '../../category/category.module';
import { MemberModule } from '../../member/member.module';
import { AnswerModule } from '../answer.module';
import { Question } from '../../question/entity/question';
import { Category } from '../../category/entity/category';
import { Member } from '../../member/entity/member';
import { createIntegrationTestModule } from '../../util/test.util';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { QuestionModule } from '../../question/question.module';
import { createAnswerRequestFixture } from '../fixture/answer.fixture';

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

      //then
      await expect(
        service.addAnswer(createAnswerRequestFixture, memberFixture),
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

      //then
      await expect(
        service.addAnswer(createAnswerRequestFixture, memberFixture),
      ).rejects.toThrow(new QuestionNotFoundException());
    });
  });
});

describe('AnswerService 통합테스트', () => {
  let app: INestApplication;
  let categoryRepository: CategoryRepository;
  let questionRepository: QuestionRepository;
  let memberRepository: MemberRepository;
  let answerRepository: AnswerRepository;
  let answerService: AnswerService;

  beforeAll(async () => {
    const modules = [
      CategoryModule,
      MemberModule,
      AnswerModule,
      QuestionModule,
    ];
    const entities = [Answer, Question, Category, Member, Answer];

    const moduleFixture = await createIntegrationTestModule(modules, entities);
    app = moduleFixture.createNestApplication();
    await app.init();

    answerService = moduleFixture.get<AnswerService>(AnswerService);
    answerRepository = moduleFixture.get<AnswerRepository>(AnswerRepository);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  beforeEach(async () => {
    await categoryRepository.query('delete from Answer');
    await categoryRepository.query('delete from Question');
    await categoryRepository.query('delete from Category');
    await categoryRepository.query('delete from Member');
  });

  describe('질문추가 통합테스트', () => {
    it('질문에 대한 응답을 추가할 수 있다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(
        Category.from(categoryFixtureWithId, member),
      );
      const question = await questionRepository.save(
        Question.of(category, null, 'testQuestion'),
      );

      //when
      const createAnswerRequest = new CreateAnswerRequest(
        question.id,
        'testAnswer',
      );
      const answerResponse = await answerService.addAnswer(
        createAnswerRequest,
        member,
      );

      //then
      const answer = await answerRepository.findByContentMemberIdAndQuestionId(
        'testAnswer',
        member.id,
        question.id,
      );
      expect(answerResponse).toEqual(AnswerResponse.from(answer, member));
    });

    it('복사된 질문에 답변을 추가해도, 원본 질문에 저장된다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(
        Category.from(categoryFixtureWithId, member),
      );
      const originalQuestion = await questionRepository.save(
        Question.of(category, null, 'originalQuestion'),
      );
      const question = await questionRepository.save(
        Question.of(category, originalQuestion, 'testQuestion'),
      );

      //when
      const createAnswerRequest = new CreateAnswerRequest(
        question.id,
        'testAnswer',
      );
      const answerResponse = await answerService.addAnswer(
        createAnswerRequest,
        member,
      );

      //then
      const answer = await answerRepository.findByContentMemberIdAndQuestionId(
        'testAnswer',
        member.id,
        question.id,
      );
      expect(answerResponse).toEqual(AnswerResponse.from(answer, member));
    });
  });
});
