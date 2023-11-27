import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionRepository } from '../repository/question.repository';
import {
  createQuestionRequestFixture,
  questionFixture,
} from '../fixture/question.fixture';
import { QuestionResponse } from '../dto/questionResponse';
import { createIntegrationTestModule } from '../../util/test.util';
import { QuestionModule } from '../question.module';
import { Question } from '../entity/question';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { Member } from '../../member/entity/member';
import { MemberModule } from '../../member/member.module';
import { MemberRepository } from '../../member/repository/member.repository';
import { memberFixture } from '../../member/fixture/member.fixture';
import {
  NeedToFindByCategoryIdException,
  QuestionNotFoundException,
} from '../exception/question.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { Answer } from '../../answer/entity/answer';
import { AnswerModule } from '../../answer/answer.module';
import { WorkbookRepository } from '../../workbook/repository/workbook.repository';
import { workbookFixture } from '../../workbook/fixture/workbook.fixture';
import { WorkbookModule } from '../../workbook/workbook.module';
import { Workbook } from '../../workbook/entity/workbook';
import { WorkbookNotFoundException } from '../../workbook/exception/workbook.exception';

describe('QuestionService', () => {
  let service: QuestionService;

  const mockQuestionRepository = {
    save: jest.fn(),
    findByWorkbookId: jest.fn(),
    findById: jest.fn(),
    remove: jest.fn(),
  };

  const mockWorkbookRepository = {
    findById: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
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
      mockQuestionRepository.save.mockResolvedValue(questionFixture);

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
      await expect(service.findAllByCategory(1)).resolves.toEqual([
        QuestionResponse.from(questionFixture),
      ]);
    });

    it('카테고리 id가 isEmpty이면 NeedToFindByCategoryIdException을 발생시킨다..', async () => {
      //given

      //when

      //then
      await expect(service.findAllByCategory(null)).rejects.toThrow(
        new NeedToFindByCategoryIdException(),
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
      ).rejects.toThrow(new UnauthorizedException());
    });
  });
});

describe('QuestionService 통합 테스트', () => {
  let app: INestApplication;
  let questionService: QuestionService;
  let workbookRepository: WorkbookRepository;
  let questionRepository: QuestionRepository;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const modules = [
      QuestionModule,
      WorkbookModule,
      MemberModule,
      AnswerModule,
    ];
    const entities = [Question, Workbook, Member, Answer];

    const moduleFixture = await createIntegrationTestModule(modules, entities);
    app = moduleFixture.createNestApplication();
    await app.init();

    questionService = moduleFixture.get<QuestionService>(QuestionService);
    workbookRepository =
      moduleFixture.get<WorkbookRepository>(WorkbookRepository);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  beforeEach(async () => {
    await workbookRepository.query('delete from Question');
    await workbookRepository.query('delete from Workbook');
    await workbookRepository.query('delete from Member');
  });

  it('새로운 질문을 저장할 때 QuestionResponse객체를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
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
    await workbookRepository.save(workbookFixture);
    const response = await questionService.createQuestion(
      createQuestionRequestFixture,
      memberFixture,
    );

    //when

    const workbook = await workbookRepository.findByNameAndMemberId(
      workbookFixture.name,
      member.id,
    );

    //then
    await expect(
      questionService.findAllByCategory(workbook.id),
    ).resolves.toEqual([response]);
  });

  it('id로 질문을 삭제하면 undefined를 반환한다.', async () => {
    //given
    const member = await memberRepository.save(memberFixture);
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
});
