import { Test, TestingModule } from '@nestjs/testing';
import { AnswerService } from './answer.service';
import { AnswerRepository } from '../repository/answer.repository';
import { QuestionRepository } from '../../question/repository/question.repository';
import { Answer } from '../entity/answer';
import { memberFixture } from '../../member/fixture/member.fixture';
import { questionFixture } from '../../question/fixture/question.fixture';
import { CreateAnswerRequest } from '../dto/createAnswerRequest';
import { AnswerResponse } from '../dto/answerResponse';
import {
  QuestionForbiddenException,
  QuestionNotFoundException,
} from '../../question/exception/question.exception';
import { INestApplication } from '@nestjs/common';
import { MemberRepository } from '../../member/repository/member.repository';
import { MemberModule } from '../../member/member.module';
import { AnswerModule } from '../answer.module';
import { Question } from '../../question/entity/question';
import { Member } from '../../member/entity/member';
import {
  createIntegrationTestModule,
  createTypeOrmModuleForTest,
} from '../../util/test.util';
import { QuestionModule } from '../../question/question.module';
import {
  answerFixture,
  createAnswerRequestFixture,
  defaultAnswerRequestFixture,
} from '../fixture/answer.fixture';
import { DefaultAnswerRequest } from '../dto/defaultAnswerRequest';
import {
  AnswerForbiddenException,
  AnswerNotFoundException,
} from '../exception/answer.exception';
import { WorkbookRepository } from '../../workbook/repository/workbook.repository';
import {
  workbookFixture,
  workbookFixtureWithId,
} from '../../workbook/fixture/workbook.fixture';
import { Workbook } from '../../workbook/entity/workbook';
import { WorkbookModule } from '../../workbook/workbook.module';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CategoryRepository } from '../../category/repository/category.repository';
import { CategoryModule } from '../../category/category.module';
import { QuestionResponse } from '../../question/dto/questionResponse';

describe('AnswerService 단위 테스트', () => {
  let service: AnswerService;
  const mockAnswerRepository = {
    save: jest.fn(),
    findById: jest.fn(),
  };
  const mockQuestionRepository = {
    findById: jest.fn(),
    findWithOriginById: jest.fn(),
    save: jest.fn(),
    findOriginById: jest.fn(),
    update: jest.fn(),
  };

  const mockWorkbookRepository = {
    findById: jest.fn(),
  };

  jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),
  }));

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [await createTypeOrmModuleForTest()],
      providers: [
        AnswerService,
        AnswerRepository,
        QuestionRepository,
        WorkbookRepository,
      ],
    })
      .overrideProvider(AnswerRepository)
      .useValue(mockAnswerRepository)
      .overrideProvider(QuestionRepository)
      .useValue(mockQuestionRepository)
      .overrideProvider(WorkbookRepository)
      .useValue(mockWorkbookRepository)
      .compile();

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('답변 추가', () => {
    it('질문에 답변을 추가한다.', async () => {
      //given
      mockQuestionRepository.findOriginById.mockResolvedValue(questionFixture);

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
      mockQuestionRepository.findOriginById.mockRejectedValue(
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

  describe('질문에 대표답변 등록', () => {
    it('질문에 대한 대표답변을 등록하면 해당 Question에 바로 대표답변을 추가한다.', async () => {
      //given

      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockQuestionRepository.update.mockResolvedValue(questionFixture);
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixtureWithId);
      mockAnswerRepository.findById.mockResolvedValue(answerFixture);

      //then
      await expect(
        service.setDefaultAnswer(defaultAnswerRequestFixture, memberFixture),
      ).resolves.toBeUndefined();
    });

    it('해당 id의 질문이 없으면 QuestionNotFoundException을 발생시킨다..', async () => {
      //given

      //when
      mockQuestionRepository.findById.mockResolvedValue(undefined);
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixtureWithId);
      mockAnswerRepository.findById.mockResolvedValue(answerFixture);

      //then
      await expect(
        service.setDefaultAnswer(defaultAnswerRequestFixture, memberFixture),
      ).rejects.toThrow(new QuestionNotFoundException());
    });

    it('질문에 대한 카테고리가 본인의 소유가 Forbidden 예외처리한다(해당 질문이 속한 카테고리는 본인의 소유여야 한다)', async () => {
      //given

      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockWorkbookRepository.findById.mockResolvedValue(
        Workbook.of(
          'FE 테스트',
          '테스트용 FE 문제집입니다.',
          categoryFixtureWithId,
          new Member(
            100,
            'janghee@janghee.com',
            'janghee',
            'https://jangsarchive.tistory.com',
            new Date(),
          ),
          true,
        ),
      );
      mockAnswerRepository.findById.mockResolvedValue(answerFixture);

      //then
      await expect(
        service.setDefaultAnswer(defaultAnswerRequestFixture, memberFixture),
      ).rejects.toThrow(new QuestionForbiddenException());
    });
  });
});

describe('AnswerService 통합테스트', () => {
  let app: INestApplication;
  let workbookRepository: WorkbookRepository;
  let questionRepository: QuestionRepository;
  let memberRepository: MemberRepository;
  let answerRepository: AnswerRepository;
  let answerService: AnswerService;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    const modules = [
      MemberModule,
      AnswerModule,
      QuestionModule,
      WorkbookModule,
      CategoryModule,
    ];

    const moduleFixture = await createIntegrationTestModule(modules);
    app = moduleFixture.createNestApplication();
    await app.init();

    answerService = moduleFixture.get<AnswerService>(AnswerService);
    answerRepository = moduleFixture.get<AnswerRepository>(AnswerRepository);
    workbookRepository =
      moduleFixture.get<WorkbookRepository>(WorkbookRepository);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
  });

  beforeEach(async () => {
    await workbookRepository.query('delete from Answer');
    await workbookRepository.query('delete from Question');
    await workbookRepository.query('delete from Workbook');
    await workbookRepository.query('delete from Member');
  });

  describe('답변 추가', () => {
    it('질문에 대한 응답을 추가할 수 있다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
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
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const originalQuestion = await questionRepository.save(
        Question.of(workbook, null, 'originalQuestion'),
      );
      const question = await questionRepository.save(
        Question.of(workbook, originalQuestion, 'testQuestion'),
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
        originalQuestion.id,
      );
      expect(answerResponse).toEqual(AnswerResponse.from(answer, member));
    });
  });

  describe('대표답변 설정', () => {
    it('Member와 알맞은 Questin이 온다면, 정상적으로 대표 답변을 설정해준다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'test'),
      );
      const answer = await answerRepository.save(
        Answer.of('test', member, question),
      );

      //when
      await answerService.setDefaultAnswer(
        new DefaultAnswerRequest(question.id, answer.id),
        member,
      );
      const updatedQuestion = await questionRepository.findById(question.id);
      const questionResponse = QuestionResponse.from(updatedQuestion);

      //then
      expect(updatedQuestion.defaultAnswer.id).toEqual(answer.id);
      expect(questionResponse.questionId).toBe(updatedQuestion.id);
      expect(questionResponse.questionContent).toBe(updatedQuestion.content);
      expect(questionResponse.answerId).toBe(updatedQuestion.defaultAnswer.id);
      expect(questionResponse.answerContent).toBe(
        updatedQuestion.defaultAnswer.content,
      );
    });
  });

  describe('질문에 대한 답변들 조회', () => {
    it('질문에 대한 모든 답변들이 반환된다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const member1 = await memberRepository.save(
        new Member(
          null,
          'ja@ja.com',
          'ja',
          'https://jangsarchive.tistory.com',
          new Date(),
        ),
      );
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'test'),
      );
      for (let index = 1; index <= 10; index++) {
        await answerRepository.save(
          Answer.of(`test${index}`, member, question),
        );
        await answerRepository.save(
          Answer.of(`TEST${index}`, member1, question),
        );
      }

      //when

      //then
      const list = await answerService.getAnswerList(question.id);
      expect(list.length).toEqual(20);
    });

    it('대표답변으로 설정하면 처음으로 온다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'test'),
      );
      for (let index = 1; index <= 10; index++) {
        await answerRepository.save(
          Answer.of(`test${index}`, member, question),
        );
      }
      const answer = await answerRepository.save(
        Answer.of(`defaultAnswer`, member, question),
      );
      question.setDefaultAnswer(answer);
      await questionRepository.save(question);

      //when

      //then
      const list = await answerService.getAnswerList(question.id);
      expect(list[0].content).toEqual('defaultAnswer');
    });

    it('원본질문이 아니면 원본 질문의 답변이 온다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const origin = await questionRepository.save(
        Question.of(workbook, null, 'origin'),
      );
      const question = await questionRepository.save(
        Question.of(workbook, origin, 'test'),
      );
      for (let index = 1; index <= 10; index++) {
        await answerRepository.save(Answer.of(`test${index}`, member, origin));
      }
      const answer = await answerRepository.save(
        Answer.of(`defaultAnswer`, member, origin),
      );
      question.setDefaultAnswer(answer);
      await questionRepository.save(question);

      //when

      //then
      const list = await answerService.getAnswerList(question.id);
      expect(list[0].content).toEqual('defaultAnswer');
    });
  });

  describe('답변 삭제', () => {
    it('답변을 삭제할 때 대표답변이라면 답변을 삭제하고 게시물의 대표답변은 null이 된다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'test'),
      );
      const answer = await answerRepository.save(
        Answer.of(`defaultAnswer`, member, question),
      );
      question.setDefaultAnswer(answer);
      await questionRepository.save(question);

      //when

      //then
      await answerService.deleteAnswer(answer.id, member);
      const afterDeleteQuestion = await questionRepository.findById(
        question.id,
      );
      expect(afterDeleteQuestion.defaultAnswer).toBeNull();
    });

    it('답변을 삭제할 때 다른 사람의 답변을 삭제하면 AnswerForbiddenException을 반환한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const member1 = await memberRepository.save(
        new Member(
          100,
          'janghee@janghee.com',
          'janghee',
          'https://jangsarchive.tistory.com',
          new Date(),
        ),
      );
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'test'),
      );
      const answer = await answerRepository.save(
        Answer.of(`defaultAnswer`, member, question),
      );
      question.setDefaultAnswer(answer);
      await questionRepository.save(question);

      //when

      //then
      await expect(
        answerService.deleteAnswer(answer.id, member1),
      ).rejects.toThrow(new AnswerForbiddenException());
    });

    it('답변을 삭제할 때 다른 사람의 답변을 삭제하면 AnswerForbiddenException을 반환한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const member1 = await memberRepository.save(
        new Member(
          100,
          'janghee@janghee.com',
          'janghee',
          'https://jangsarchive.tistory.com',
          new Date(),
        ),
      );
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'test'),
      );
      const answer = await answerRepository.save(
        Answer.of(`defaultAnswer`, member, question),
      );
      question.setDefaultAnswer(answer);
      await questionRepository.save(question);

      //when

      //then
      await expect(answerService.deleteAnswer(128135, member1)).rejects.toThrow(
        new AnswerNotFoundException(),
      );
    });
  });
});
