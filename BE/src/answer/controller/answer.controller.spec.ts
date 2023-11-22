import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from './answer.controller';
import { AnswerService } from '../service/answer.service';
import { AnswerResponse } from '../dto/answerResponse';
import {
  memberFixture,
  memberFixturesOAuthRequest,
  mockReqWithMemberFixture,
} from '../../member/fixture/member.fixture';
import {
  answerFixture,
  createAnswerRequestFixture,
} from '../fixture/answer.fixture';
import { INestApplication } from '@nestjs/common';
import { CategoryRepository } from '../../category/repository/category.repository';
import { CategoryModule } from '../../category/category.module';
import { MemberModule } from '../../member/member.module';
import { AnswerModule } from '../answer.module';
import { QuestionModule } from '../../question/question.module';
import { Answer } from '../entity/answer';
import { Question } from '../../question/entity/question';
import { Category } from '../../category/entity/category';
import { Member } from '../../member/entity/member';
import {
  addAppModules,
  createIntegrationTestModule,
} from '../../util/test.util';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import * as request from 'supertest';
import { AuthService } from '../../auth/service/auth.service';
import { AuthModule } from '../../auth/auth.module';
import { TokenModule } from '../../token/token.module';
import { QuestionRepository } from '../../question/repository/question.repository';
import { CreateAnswerRequest } from '../dto/createAnswerRequest';
import { Token } from '../../token/entity/token';
import { AnswerRepository } from '../repository/answer.repository';

describe('AnswerController 단위테스트', () => {
  let controller: AnswerController;

  const mockAnswerService = {
    addAnswer: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [AnswerService],
    })
      .overrideProvider(AnswerService)
      .useValue(mockAnswerService)
      .compile();

    controller = module.get<AnswerController>(AnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('질문 추가', () => {
    it('원본 질문에 바로 질문을 추가할 수 있다.', async () => {
      //given
      mockAnswerService.addAnswer.mockResolvedValue(
        AnswerResponse.from(answerFixture, memberFixture),
      );

      //when

      //then
      await expect(
        controller.createAnswer(
          createAnswerRequestFixture,
          mockReqWithMemberFixture,
        ),
      ).resolves.toEqual(AnswerResponse.from(answerFixture, memberFixture));
    });
  });
});

describe('AnswerController 통합테스트', () => {
  let app: INestApplication;
  let categoryRepository: CategoryRepository;
  let authService: AuthService;
  let questionRepository: QuestionRepository;
  let answerRepository: AnswerRepository;

  beforeAll(async () => {
    const modules = [
      CategoryModule,
      MemberModule,
      AnswerModule,
      QuestionModule,
      AuthModule,
      TokenModule,
    ];
    const entities = [Answer, Question, Category, Member, Answer, Token];

    const moduleFixture = await createIntegrationTestModule(modules, entities);
    app = moduleFixture.createNestApplication();
    addAppModules(app);
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    answerRepository = moduleFixture.get<AnswerRepository>(AnswerRepository);
  });

  beforeEach(async () => {
    await categoryRepository.query('delete from Answer');
    await categoryRepository.query('delete from Question');
    await categoryRepository.query('delete from Category');
    await categoryRepository.query('delete from Member');
  });

  describe('질문 추가', () => {
    it('쿠키를 가지고 원본 질문에 답변 생성을 요청하면 201코드와 생성된 질문의 Response가 반환된다.', async () => {
      //given
      const token = await authService.login(memberFixturesOAuthRequest);
      const category = await categoryRepository.save(categoryFixtureWithId);
      const question = await questionRepository.save(
        Question.of(category, null, 'testQuestion'),
      );

      //when
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer')
        .set('Cookie', [`accessToken=${token}`])
        .send(new CreateAnswerRequest(question.id, 'testContent'))
        .expect(201)
        .then(() => {});
      //then
    });

    it('쿠키를 가지고 복사된 질문에 답변 생성을 요청하면 원본에 대한 답변으로 저장하고 201코드와 생성된 질문의 Response가 반환된다.', async () => {
      //given
      const token = await authService.login(memberFixturesOAuthRequest);
      const category = await categoryRepository.save(categoryFixtureWithId);
      const question = await questionRepository.save(
        Question.of(category, null, 'testQuestion'),
      );
      const copyQuestion = await questionRepository.save(
        Question.copyOf(question, category),
      );

      //when&then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer')
        .set('Cookie', [`accessToken=${token}`])
        .send(new CreateAnswerRequest(copyQuestion.id, 'testContent'))
        .expect(201)
        .then(() => {});
    });

    it('쿠키가 존재하지 않으면 401에러를 반환한다.', async () => {
      //given
      const category = await categoryRepository.save(categoryFixtureWithId);
      const question = await questionRepository.save(
        Question.of(category, null, 'testQuestion'),
      );
      const copyQuestion = await questionRepository.save(
        Question.copyOf(question, category),
      );

      //when&then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer')
        .send(new CreateAnswerRequest(copyQuestion.id, 'testContent'))
        .expect(401)
        .then(() => {});
    });

    it('Question의 id가 존재하지 않으면 404코드를 반환한다.', async () => {
      //given
      const token = await authService.login(memberFixturesOAuthRequest);

      //when&then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer')
        .set('Cookie', [`accessToken=${token}`])
        .send(new CreateAnswerRequest(12345, 'testContent'))
        .expect(404)
        .then(() => {});
    });

    it('content가 존재하지 않으면 404코드를 반환한다.', async () => {
      //given
      const token = await authService.login(memberFixturesOAuthRequest);
      const category = await categoryRepository.save(categoryFixtureWithId);
      const question = await questionRepository.save(
        Question.of(category, null, 'testQuestion'),
      );

      //when&then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer')
        .set('Cookie', [`accessToken=${token}`])
        .send(new CreateAnswerRequest(question.id, ''))
        .expect(404)
        .then(() => {});
    });
  });
});
