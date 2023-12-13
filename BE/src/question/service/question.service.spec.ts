import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionRepository } from '../repository/question.repository';
import {
  copyQuestionRequestFixture,
  createQuestionRequestFixture,
  questionFixture,
} from '../fixture/question.fixture';
import { QuestionResponse } from '../dto/questionResponse';
import {
  createIntegrationTestModule,
  createTypeOrmModuleForTest,
} from '../../util/test.util';
import { QuestionModule } from '../question.module';
import { Question } from '../entity/question';
import { INestApplication } from '@nestjs/common';
import { Member } from '../../member/entity/member';
import { MemberModule } from '../../member/member.module';
import { MemberRepository } from '../../member/repository/member.repository';
import {
  memberFixture,
  otherMemberFixture,
} from '../../member/fixture/member.fixture';
import { QuestionNotFoundException } from '../exception/question.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { AnswerModule } from '../../answer/answer.module';
import { WorkbookRepository } from '../../workbook/repository/workbook.repository';
import {
  workbookFixture,
  workbookFixtureWithId,
} from '../../workbook/fixture/workbook.fixture';
import { WorkbookModule } from '../../workbook/workbook.module';
import { Workbook } from '../../workbook/entity/workbook';
import {
  NeedToFindByWorkbookIdException,
  WorkbookForbiddenException,
  WorkbookNotFoundException,
} from '../../workbook/exception/workbook.exception';
import { CategoryRepository } from '../../category/repository/category.repository';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CategoryModule } from '../../category/category.module';
import { WorkbookIdResponse } from '../../workbook/dto/workbookIdResponse';
import { CopyQuestionRequest } from '../dto/copyQuestionRequest';

describe('QuestionService', () => {
  let service: QuestionService;

  const mockQuestionRepository = {
    save: jest.fn(),
    insert: jest.fn(),
    saveAll: jest.fn(),
    findByWorkbookId: jest.fn(),
    findById: jest.fn(),
    remove: jest.fn(),
    findAllByIds: jest.fn(),
  };

  const mockWorkbookRepository = {
    findById: jest.fn(),
    update: jest.fn(),
  };

  jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),
  }));

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [await createTypeOrmModuleForTest()],
      providers: [QuestionService, QuestionRepository, WorkbookRepository],
    })
      .overrideProvider(QuestionRepository)
      .useValue(mockQuestionRepository)
      .overrideProvider(WorkbookRepository)
      .useValue(mockWorkbookRepository)
      .compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('질문 추가', () => {
    it('질문 추가시, workbookId와 content가 있다면 성공적으로 질문을 추가한다.', async () => {
      //given

      //when
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixture);
      mockQuestionRepository.insert.mockResolvedValue(questionFixture);

      //then
      await expect(
        service.createQuestion(createQuestionRequestFixture, memberFixture),
      ).resolves.toEqual(QuestionResponse.from(questionFixture));
    });

    it('질문 추가시, workbookId가 null이거나, 존재하지 않으면 WorkbookNotFoundException을 반환한다.', async () => {
      //given

      //when
      mockWorkbookRepository.findById.mockResolvedValue(undefined);

      //then
      await expect(
        service.createQuestion(createQuestionRequestFixture, memberFixture),
      ).rejects.toThrow(new WorkbookNotFoundException());
    });
  });

  describe('카테고리별 질문 조회', () => {
    it('카테고리 id로 질문들을 조회하면, 해당 카테고리 내부 질문들이 반환된다.', async () => {
      //given

      //when
      mockQuestionRepository.findByWorkbookId.mockResolvedValue([
        questionFixture,
      ]);

      //then
      await expect(service.findAllByWorkbookId(1)).resolves.toEqual([
        QuestionResponse.from(questionFixture),
      ]);
    });

    it('카테고리 id가 isEmpty이면 NeedToFindByCategoryIdException을 발생시킨다..', async () => {
      //given

      //when

      //then
      await expect(service.findAllByWorkbookId(null)).rejects.toThrow(
        new NeedToFindByWorkbookIdException(),
      );
    });
  });

  describe('질문 삭제', () => {
    it('Member객체와 questionId를 입력했을 때 정상적으로 질문을 삭제한다.', async () => {
      //given

      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixture);

      //then
      await expect(
        service.deleteQuestionById(questionFixture.id, memberFixture),
      ).resolves.toBeUndefined();
    });

    it('Member객체가 없으면 ManipulatedTokenException을 발생시킨다.', async () => {
      //given
      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixture);

      //then
      await expect(
        service.deleteQuestionById(questionFixture.id, null),
      ).rejects.toThrow(new ManipulatedTokenNotFiltered());
    });

    it('questionId로 질문이 조회되지 않으면 QuestionNotFoundException을 발생시킨다.', async () => {
      //given
      //when
      mockQuestionRepository.findById.mockResolvedValue(null);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixture);

      //then
      await expect(
        service.deleteQuestionById(questionFixture.id, memberFixture),
      ).rejects.toThrow(new QuestionNotFoundException());
    });

    it('question의 카테고리를 조회했을 때 카테고리가 존재하지 않는다면 WorkbookNotFoundException을 발생시킨다.', async () => {
      //given
      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockWorkbookRepository.findById.mockResolvedValue(undefined);

      //then
      await expect(
        service.deleteQuestionById(questionFixture.id, memberFixture),
      ).rejects.toThrow(new WorkbookNotFoundException());
    });

    it('question의 카테고리를 조회했을 때 카테고리가 Member의 카테고리가 아니라면 권한 없음을 발생시킨다.', async () => {
      //given
      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixture);

      //then
      await expect(
        service.deleteQuestionById(
          questionFixture.id,
          new Member(
            123,
            'janghee@janghee.com',
            'janghee',
            'https://www.google.co.kr',
            new Date(),
          ),
        ),
      ).rejects.toThrow(new WorkbookForbiddenException());
    });
  });

  describe('질문 복제', () => {
    it('workbookId의 조회결과가 모두 있을 때 질문을 성공적으로 복제한다.', async () => {
      //given
      //when
      mockQuestionRepository.findAllByIds.mockResolvedValue([
        questionFixture,
        questionFixture,
        questionFixture,
      ]);
      mockQuestionRepository.saveAll.mockResolvedValue(undefined);
      mockWorkbookRepository.update.mockResolvedValue(undefined);
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixtureWithId);

      //then
      const result = await service.copyQuestions(
        copyQuestionRequestFixture,
        memberFixture,
      );
      expect(result).toBeInstanceOf(WorkbookIdResponse);
      expect(result.workbookId).toBe(workbookFixtureWithId.id);
    });

    it('workbookId가 존재하지 않는 문제집이면 WorkbookNotFoundException예외처리한다.', async () => {
      //given
      //when
      mockQuestionRepository.findAllByIds.mockResolvedValue([
        questionFixture,
        questionFixture,
        questionFixture,
      ]);
      mockQuestionRepository.saveAll.mockResolvedValue(undefined);
      mockWorkbookRepository.update.mockResolvedValue(undefined);
      mockWorkbookRepository.findById.mockResolvedValue(null);

      //then
      await expect(
        service.copyQuestions(copyQuestionRequestFixture, memberFixture),
      ).rejects.toThrow(new WorkbookNotFoundException());
    });

    it('자신의 것이 아닌 문제집으로 문제들을 복사하려하면 WorkbookForbiddenException예외처리한다.', async () => {
      //given
      //when
      mockQuestionRepository.findAllByIds.mockResolvedValue([
        questionFixture,
        questionFixture,
        questionFixture,
      ]);
      mockQuestionRepository.saveAll.mockResolvedValue(undefined);
      mockWorkbookRepository.update.mockResolvedValue(undefined);
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixtureWithId);

      //then
      await expect(
        service.copyQuestions(copyQuestionRequestFixture, otherMemberFixture),
      ).rejects.toThrow(new WorkbookForbiddenException());
    });
  });
});

describe('QuestionService 통합 테스트', () => {
  let app: INestApplication;
  let questionService: QuestionService;
  let workbookRepository: WorkbookRepository;
  let questionRepository: QuestionRepository;
  let memberRepository: MemberRepository;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    const modules = [
      QuestionModule,
      WorkbookModule,
      MemberModule,
      AnswerModule,
      CategoryModule,
    ];

    const moduleFixture = await createIntegrationTestModule(modules);
    app = moduleFixture.createNestApplication();
    await app.init();

    questionService = moduleFixture.get<QuestionService>(QuestionService);
    workbookRepository =
      moduleFixture.get<WorkbookRepository>(WorkbookRepository);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
  });

  beforeEach(async () => {
    await workbookRepository.query('delete from Question');
    await workbookRepository.query('delete from Workbook');
    await workbookRepository.query('delete from Member');
  });

  it('새로운 질문을 저장할 때 QuestionResponse객체를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    await workbookRepository.save(workbookFixture);

    //when

    //then
    await expect(
      questionService.createQuestion(
        createQuestionRequestFixture,
        memberFixture,
      ),
    ).resolves.toEqual(QuestionResponse.from(questionFixture));
  });

  it('카테고리의 질문을 조회하면 QuestionResponse의 배열로 반환된다.', async () => {
    //given
    const member = await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    await workbookRepository.save(workbookFixture);
    const response = await questionService.createQuestion(
      createQuestionRequestFixture,
      memberFixture,
    );

    //when

    const workbook = await workbookRepository.findByNameAndMemberId(
      workbookFixture.title,
      member.id,
    );

    //then
    await expect(
      questionService.findAllByWorkbookId(workbook.id),
    ).resolves.toEqual([response]);
  });

  it('id로 질문을 삭제하면 undefined를 반환한다.', async () => {
    //given
    const member = await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    const workbook = await workbookRepository.save(workbookFixture);
    const question = await questionRepository.save(
      Question.of(workbook, null, 'tester'),
    );
    //when

    //then
    await expect(
      questionService.deleteQuestionById(question.id, member),
    ).resolves.toBeUndefined();
  });

  it('문제를 성공적으로 복사하면 WorkbookIdResponse를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    const workbook = await workbookRepository.save(workbookFixture);
    for (let index = 0; index < 3; index++) {
      await questionRepository.save(Question.of(workbook, null, 'tester'));
    }
    const other = await memberRepository.save(otherMemberFixture);
    const othersWorkbook = await workbookRepository.save(
      Workbook.of('test', 'test', categoryFixtureWithId, other, true),
    );
    //when
    const copyRequest = new CopyQuestionRequest(othersWorkbook.id, [1, 2, 3]);

    //then
    const result = await questionService.copyQuestions(copyRequest, other);
    expect(result).toBeInstanceOf(WorkbookIdResponse);
    expect(result.workbookId).toBe(othersWorkbook.id);
  });

  it('다른 복사본에서 복사를 진행하면 원본을 origin으로 가진다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    const workbook = await workbookRepository.save(workbookFixture);
    const workbook2 = await workbookRepository.save(
      Workbook.of('copy', 'copy', categoryFixtureWithId, memberFixture, true),
    );

    const questionIds = [];

    for (let index = 0; index < 3; index++) {
      const question = await questionRepository.save(
        Question.of(workbook, null, 'tester'),
      );
      questionIds.push(
        (await questionRepository.save(Question.copyOf(question, workbook2)))
          .id,
      );
    }

    const other = await memberRepository.save(otherMemberFixture);
    const othersWorkbook = await workbookRepository.save(
      Workbook.of('test', 'test', categoryFixtureWithId, other, true),
    );
    //when
    const copyRequest = new CopyQuestionRequest(othersWorkbook.id, questionIds);

    //then
    const result = await questionService.copyQuestions(copyRequest, other);
    expect(result).toBeInstanceOf(WorkbookIdResponse);
    expect(result.workbookId).toBe(othersWorkbook.id);
  });
});
