import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from '../service/question.service';
import { TokenService } from '../../token/service/token.service';
import { QuestionResponse } from '../dto/questionResponse';
import {
  createQuestionRequestFixture,
  questionFixture,
} from '../fixture/question.fixture';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { TokenModule } from '../../token/token.module';
import { createIntegrationTestModule } from '../../util/test.util';
import { QuestionModule } from '../question.module';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/service/auth.service';
import { Response } from 'express';
import {
  memberFixture,
  memberFixturesOAuthRequest,
  mockReqWithMemberFixture,
  oauthRequestFixture,
  otherMemberFixture,
} from '../../member/fixture/member.fixture';
import * as request from 'supertest';
import { Question } from '../entity/question';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import * as cookieParser from 'cookie-parser';
import { QuestionRepository } from '../repository/question.repository';
import { WorkbookRepository } from '../../workbook/repository/workbook.repository';
import {
  otherWorkbookFixture,
  workbookFixture,
} from '../../workbook/fixture/workbook.fixture';
import { WorkbookModule } from '../../workbook/workbook.module';
import { Workbook } from '../../workbook/entity/workbook';
import { MemberRepository } from '../../member/repository/member.repository';
import { CategoryRepository } from '../../category/repository/category.repository';
import { CategoryModule } from '../../category/category.module';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CopyQuestionRequest } from '../dto/copyQuestionRequest';

describe('QuestionController', () => {
  let controller: QuestionController;
  const mockQuestionService = {
    createQuestion: jest.fn(),
    findAllByWorkbookId: jest.fn(),
    deleteQuestionById: jest.fn(),
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

  it('저장 성공시 QuestionResponse객체를 반환한다.', async () => {
    //given

    //when
    mockQuestionService.createQuestion.mockResolvedValue(
      QuestionResponse.from(questionFixture),
    );
    //then
    await expect(
      controller.createCustomQuestion(
        createQuestionRequestFixture,
        mockReqWithMemberFixture,
      ),
    ).resolves.toEqual(QuestionResponse.from(questionFixture));
  });

  it('조회시 QuestionResponseList객체를 반환한다.', async () => {
    //given

    //when
    mockQuestionService.findAllByWorkbookId.mockResolvedValue([
      QuestionResponse.from(questionFixture),
    ]);
    //then
    await expect(controller.findWorkbookQuestions(1)).resolves.toEqual([
      QuestionResponse.from(questionFixture),
    ]);
  });

  it('질문 삭제시 undefined를 반환한다.', async () => {
    //given
    const res = {
      status: jest.fn().mockReturnThis(), // Mock the status method
      send: jest.fn(), // Mock the send method
    } as unknown as Response;

    //when
    mockQuestionService.deleteQuestionById.mockResolvedValue(undefined);

    //then
    await expect(
      controller.deleteQuestionById(
        1,
        mockReqWithMemberFixture,
        res as unknown as Response,
      ),
    ).resolves.toBeUndefined();
  });
});

describe('QuestionController 통합테스트', () => {
  let app: INestApplication;
  let workbookRepository: WorkbookRepository;
  let authService: AuthService;
  let questionRepository: QuestionRepository;
  let memberRepository: MemberRepository;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    const modules = [
      QuestionModule,
      TokenModule,
      AuthModule,
      WorkbookModule,
      CategoryModule,
    ];

    const moduleFixture: TestingModule =
      await createIntegrationTestModule(modules);

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    workbookRepository =
      moduleFixture.get<WorkbookRepository>(WorkbookRepository);
    authService = moduleFixture.get<AuthService>(AuthService);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
  });

  it('쿠키를 가지고 질문 생성을 요청하면 201코드와 생성된 질문의 Response가 반환된다.', async () => {
    //given
    const token = await authService.login(oauthRequestFixture);
    await categoryRepository.save(categoryFixtureWithId);
    await workbookRepository.save(workbookFixture);

    //when
    const agent = request.agent(app.getHttpServer());
    await agent
      .post('/api/question')
      .set('Cookie', [`accessToken=${token}`])
      .send(createQuestionRequestFixture)
      .expect(201)
      .then(() => {});
    //then
  });

  it('content가 isEmpty면 예외처리한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    const token = await authService.login(memberFixturesOAuthRequest);
    await categoryRepository.save(categoryFixtureWithId);
    const workbook = await workbookRepository.save(workbookFixture);

    //when
    const agent = request.agent(app.getHttpServer());
    await agent
      .post('/api/question')
      .set('Cookie', [`accessToken=${token}`])
      .send(new CreateQuestionRequest(workbook.id, null))
      .expect(400)
      .then(() => {});
    //then
  });

  describe('질문 삭제', () => {
    it('Member객체와 questionId를 입력했을 때 정상적으로 질문을 삭제한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'tester'),
      );

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/question/${question.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(204);
    });

    it('토큰이 없으면 UnauthorizedException을 발생시킨다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'tester'),
      );

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent.delete(`/api/question/${question.id}`).expect(401);
    });

    it('questionId로 질문이 조회되지 않으면 QuestionNotFoundException을 발생시킨다.', async () => {
      //given

      //when & then
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/question/${1000}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(404);
    });

    it('question의 카테고리를 조회했을 때 카테고리가 Member의 카테고리가 아니라면 권한 없음을 발생시킨다.', async () => {
      //given
      const token = await authService.login(memberFixturesOAuthRequest);
      await memberRepository.save(otherMemberFixture);
      const workbook = await workbookRepository.save(otherWorkbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'tester'),
      );

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/question/${question.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect((error) => console.log(error))
        .expect(403);
    });
  });

  describe('문제집의 질문을 복제한다.', () => {
    it('문제집을 복제하면 201코드를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'tester'),
      );

      const token = await authService.login(memberFixturesOAuthRequest);
      const requester = await memberRepository.findByEmail(
        memberFixturesOAuthRequest.email,
      );
      const copyWorkbook = await workbookRepository.save(
        Workbook.of('copy', 'copy', category, requester, true),
      );

      const copyRequest = new CopyQuestionRequest(copyWorkbook.id, [
        question.id,
      ]);

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/question/copy')
        .set('Cookie', [`accessToken=${token}`])
        .send(copyRequest)
        .expect(201)
        .then(() => {});
    });

    it('문제집을 복제 권한이 없으면 403 코드를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'tester'),
      );

      await authService.login(oauthRequestFixture);
      const requester = await memberRepository.findByEmail(
        oauthRequestFixture.email,
      );
      const copyWorkbook = await workbookRepository.save(
        Workbook.of('copy', 'copy', category, requester, true),
      );

      const copyRequest = new CopyQuestionRequest(copyWorkbook.id, [
        question.id,
      ]);

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/question/copy')
        .set('Cookie', [
          `accessToken=${await authService.login(memberFixturesOAuthRequest)}`,
        ])
        .send(copyRequest)
        .expect(403)
        .then(() => {});
    });

    it('토큰이 없으면 401코드를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'tester'),
      );

      await authService.login(oauthRequestFixture);
      const requester = await memberRepository.findByEmail(
        oauthRequestFixture.email,
      );
      const copyWorkbook = await workbookRepository.save(
        Workbook.of('copy', 'copy', category, requester, true),
      );

      const copyRequest = new CopyQuestionRequest(copyWorkbook.id, [
        question.id,
      ]);

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/question/copy')
        .send(copyRequest)
        .expect(401)
        .then(() => {});
    });

    it('문제집이 없다면 404를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'tester'),
      );

      const token = await authService.login(oauthRequestFixture);
      const requester = await memberRepository.findByEmail(
        oauthRequestFixture.email,
      );
      await workbookRepository.save(
        Workbook.of('copy', 'copy', category, requester, true),
      );

      const copyRequest = new CopyQuestionRequest(135124, [question.id]);

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/question/copy')
        .set('Cookie', [`accessToken=${token}`])
        .send(copyRequest)
        .expect(404)
        .then(() => {});
    });
  });

  afterEach(async () => {
    await workbookRepository.query('delete from Question');
    await workbookRepository.query('delete from Workbook');
    await workbookRepository.query('delete from Member');
    await workbookRepository.query('DELETE FROM sqlite_sequence'); // Auto Increment 초기화
  });
});
