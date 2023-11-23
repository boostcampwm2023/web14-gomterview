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
import { Member } from '../../member/entity/member';
import { Token } from '../../token/entity/token';
import { createIntegrationTestModule } from '../../util/test.util';
import { QuestionModule } from '../question.module';
import { CategoryRepository } from '../../category/repository/category.repository';
import { MemberRepository } from '../../member/repository/member.repository';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/service/auth.service';
import { Response } from 'express';
import {
  memberFixture,
  memberFixturesOAuthRequest,
  mockReqWithMemberFixture,
  oauthRequestFixture,
} from '../../member/fixture/member.fixture';
import * as request from 'supertest';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { Question } from '../entity/question';
import { Category } from '../../category/entity/category';
import { CreateQuestionRequest } from '../dto/createQuestionRequest';
import * as cookieParser from 'cookie-parser';
import { QuestionRepository } from '../repository/question.repository';
import { Answer } from '../../answer/entity/answer';

describe('QuestionController', () => {
  let controller: QuestionController;
  const mockQuestionService = {
    createQuestion: jest.fn(),
    findAllByCategory: jest.fn(),
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
    mockQuestionService.findAllByCategory.mockResolvedValue([
      QuestionResponse.from(questionFixture),
    ]);
    //then
    await expect(controller.findCategoryQuestions(1)).resolves.toEqual([
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
  let categoryRepository: CategoryRepository;
  let memberRepository: MemberRepository;
  let authService: AuthService;
  let questionRepository: QuestionRepository;

  beforeAll(async () => {
    const modules = [QuestionModule, TokenModule, AuthModule];
    const entities = [Member, Token, Category, Question, Answer];

    const moduleFixture: TestingModule = await createIntegrationTestModule(
      modules,
      entities,
    );

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    authService = moduleFixture.get<AuthService>(AuthService);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
  });

  it('쿠키를 가지고 질문 생성을 요청하면 201코드와 생성된 질문의 Response가 반환된다.', async () => {
    //given
    const token = await authService.login(oauthRequestFixture);
    await categoryRepository.save(categoryFixtureWithId);

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
    const member = await memberRepository.save(memberFixture);
    const token = await authService.login(memberFixturesOAuthRequest);
    const category = await categoryRepository.save(
      Category.from(categoryFixtureWithId, member),
    );

    //when
    const agent = request.agent(app.getHttpServer());
    await agent
      .post('/api/question')
      .set('Cookie', [`accessToken=${token}`])
      .send(new CreateQuestionRequest(category.id, null))
      .expect(400)
      .then(() => {});
    //then
  });

  describe('질문 삭제', () => {
    it('Member객체와 questionId를 입력했을 때 정상적으로 질문을 삭제한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(
        Category.from(categoryFixtureWithId, member),
      );
      const question = await questionRepository.save(
        Question.of(category, null, 'tester'),
      );

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/question?questionId=${question.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(204);
    });

    it('토큰이 없으면 UnauthorizedException을 발생시킨다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(
        Category.from(categoryFixtureWithId, member),
      );
      const question = await questionRepository.save(
        Question.of(category, null, 'tester'),
      );

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent.delete(`/api/question?questionId=${question.id}`).expect(401);
    });

    it('questionId로 질문이 조회되지 않으면 QuestionNotFoundException을 발생시킨다.', async () => {
      //given

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/question?questionId=${1000}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(404);
    });

    it('question의 카테고리를 조회했을 때 카테고리가 Member의 카테고리가 아니라면 권한 없음을 발생시킨다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(
        Category.from(categoryFixtureWithId, member),
      );
      const question = await questionRepository.save(
        Question.of(category, null, 'tester'),
      );

      //when & then
      const token = await authService.login(oauthRequestFixture);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/question?questionId=${question.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(401);
    });
  });

  afterEach(async () => {
    await categoryRepository.query('delete from token');
    await categoryRepository.query('delete from Question');
    await categoryRepository.query('delete from Category');
    await categoryRepository.query('delete from Member');
  });
});
