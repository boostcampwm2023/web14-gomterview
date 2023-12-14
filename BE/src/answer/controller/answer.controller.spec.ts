import { Test, TestingModule } from '@nestjs/testing';
import { AnswerController } from './answer.controller';
import { AnswerService } from '../service/answer.service';
import { AnswerResponse } from '../dto/answerResponse';
import {
  memberFixture,
  memberFixturesOAuthRequest,
  mockReqWithMemberFixture,
  oauthRequestFixture,
} from '../../member/fixture/member.fixture';
import {
  answerFixture,
  createAnswerRequestFixture,
  defaultAnswerRequestFixture,
} from '../fixture/answer.fixture';
import { INestApplication } from '@nestjs/common';
import { CategoryModule } from '../../category/category.module';
import { MemberModule } from '../../member/member.module';
import { AnswerModule } from '../answer.module';
import { QuestionModule } from '../../question/question.module';
import { Answer } from '../entity/answer';
import { Question } from '../../question/entity/question';
import {
  addAppModules,
  createIntegrationTestModule,
} from '../../util/test.util';
import * as request from 'supertest';
import { AuthService } from '../../auth/service/auth.service';
import { AuthModule } from '../../auth/auth.module';
import { TokenModule } from '../../token/token.module';
import { QuestionRepository } from '../../question/repository/question.repository';
import { CreateAnswerRequest } from '../dto/createAnswerRequest';
import { AnswerRepository } from '../repository/answer.repository';
import { MemberRepository } from '../../member/repository/member.repository';
import { DefaultAnswerRequest } from '../dto/defaultAnswerRequest';
import { workbookFixture } from '../../workbook/fixture/workbook.fixture';
import { WorkbookRepository } from '../../workbook/repository/workbook.repository';
import { WorkbookModule } from '../../workbook/workbook.module';
import { CategoryRepository } from '../../category/repository/category.repository';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';

describe('AnswerController 단위테스트', () => {
  let controller: AnswerController;

  const mockAnswerService = {
    addAnswer: jest.fn(),
    setDefaultAnswer: jest.fn(),
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

  describe('대표답변 변경', () => {
    it('각 질문에 대한 대표 답변을 설정할 수 있다.', async () => {
      //given
      mockAnswerService.setDefaultAnswer.mockResolvedValue(undefined);

      //when

      //then
      await expect(
        controller.updateDefaultAnswer(
          defaultAnswerRequestFixture,
          mockReqWithMemberFixture,
        ),
      ).resolves.toBeUndefined();
    });
  });
});

describe('AnswerController 통합테스트', () => {
  let app: INestApplication;
  let workbookRepository: WorkbookRepository;
  let authService: AuthService;
  let questionRepository: QuestionRepository;
  let answerRepository: AnswerRepository;
  let memberRepository: MemberRepository;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    const modules = [
      CategoryModule,
      MemberModule,
      AnswerModule,
      QuestionModule,
      AuthModule,
      TokenModule,
      WorkbookModule,
    ];

    const moduleFixture = await createIntegrationTestModule(modules);
    app = moduleFixture.createNestApplication();
    addAppModules(app);
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    workbookRepository =
      moduleFixture.get<WorkbookRepository>(WorkbookRepository);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    answerRepository = moduleFixture.get<AnswerRepository>(AnswerRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
  });

  beforeEach(async () => {
    await workbookRepository.query('delete from Answer');
    await workbookRepository.query('delete from Question');
    await workbookRepository.query('delete from Workbook');
    await workbookRepository.query('delete from Member');
    await workbookRepository.query('DELETE FROM sqlite_sequence'); // Auto Increment 초기화
  });

  describe('질문 추가', () => {
    it('쿠키를 가지고 원본 질문에 답변 생성을 요청하면 201코드와 생성된 질문의 Response가 반환된다.', async () => {
      //given
      const token = await authService.login(memberFixturesOAuthRequest);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
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
      await memberRepository.save(memberFixture);
      const token = await authService.login(memberFixturesOAuthRequest);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const copyQuestion = await questionRepository.save(
        Question.copyOf(question, workbook),
      );

      //when&then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer')
        .set('Cookie', [`accessToken=${token}`])
        .send(new CreateAnswerRequest(copyQuestion.id, 'testContent'))
        .expect(201)
        .then();
    });

    it('쿠키가 존재하지 않으면 401에러를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const copyQuestion = await questionRepository.save(
        Question.copyOf(question, workbook),
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

    it('content가 존재하지 않으면 400코드를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      const token = await authService.login(memberFixturesOAuthRequest);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );

      //when&then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer')
        .set('Cookie', [`accessToken=${token}`])
        .send(new CreateAnswerRequest(question.id, ''))
        .expect(400)
        .then(() => {});
    });
  });

  describe('대표답변 변경', () => {
    it('토큰을 가지고 존재하는 질문에 대해 존재하는 답변으로 대표답변 설정을 요청하면 성공적으로 변경해준다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const answer = await answerRepository.save(
        Answer.of('test', member, question),
      );
      //when&then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer/default')
        .set('Cookie', [`accessToken=${token}`])
        .send(new DefaultAnswerRequest(question.id, answer.id))
        .expect(201);
    });

    it('토큰이 없으면 권한없음 처리한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const answer = await answerRepository.save(
        Answer.of('test', member, question),
      );

      //when&then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer/default')
        .send(new DefaultAnswerRequest(question.id, answer.id))
        .expect(401);
    });

    it('다른 사람의 질문 id로 대표답변을 수정하려하면 403코드를 반환한다', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const answer = await answerRepository.save(
        Answer.of('test', member, question),
      );

      //when&then
      const token = await authService.login(oauthRequestFixture);
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer/default')
        .set('Cookie', [`accessToken=${token}`])
        .send(new DefaultAnswerRequest(question.id, answer.id))
        .expect(403);
    });

    it('질문 id가 존재하지 않으면 404코드를 반환한다', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const answer = await answerRepository.save(
        Answer.of('test', member, question),
      );

      //when&then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer/default')
        .set('Cookie', [`accessToken=${token}`])
        .send(new DefaultAnswerRequest(12341, answer.id))
        .expect(404);
    });

    it('답변 id가 존재하지 않으면 404코드를 반환한다', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );

      //when&then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/answer/default')
        .set('Cookie', [`accessToken=${token}`])
        .send(new DefaultAnswerRequest(question.id, 124321))
        .expect(404);
    });
  });

  describe('질문의 답변 조회', () => {
    it('질문을 조회할 때 회원 정보가 없으면 모든 답변이 최신순으로 정렬된다. ', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      for (let index = 1; index <= 10; index++) {
        await answerRepository.save(
          Answer.of(`test${index}`, member, question),
        );
      }

      //when&then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/answer/${question.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(200);
    });

    it('질문을 조회할 때 회원 정보가 있으면 모든 등록한 DefaultAnswer부터 정렬된다. ', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const answer = await answerRepository.save(
        Answer.of('test', member, question),
      );
      question.setDefaultAnswer(answer);
      await questionRepository.save(question);
      for (let index = 1; index <= 10; index++) {
        await answerRepository.save(
          Answer.of(`test${index}`, member, question),
        );
      }

      //when&then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/answer/${question.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(200);
    });

    it('존재하지 않는 질문의 id를 조회하면 404에러를 반환한다. ', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      for (let index = 1; index <= 10; index++) {
        await answerRepository.save(
          Answer.of(`test${index}`, member, question),
        );
      }

      //when&then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/answer/130998`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(404);
    });
  });

  describe('답변 삭제', () => {
    it('답변을 삭제할 때 자신의 댓글을 삭제하려고 하면 204코드와 함께 성공한다. ', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const answer = await answerRepository.save(
        Answer.of('test', member, question),
      );

      //when&then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/answer/${answer.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(204);
    });

    it('쿠키가 없으면 401에러를 반환한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const answer = await answerRepository.save(
        Answer.of('test', member, question),
      );

      //when&then
      const agent = request.agent(app.getHttpServer());
      await agent.delete(`/api/answer/${answer.id}`).expect(401);
    });

    it('다른 사람의 답변을 삭제하면 403에러를 반환한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixture);
      const question = await questionRepository.save(
        Question.of(workbook, null, 'testQuestion'),
      );
      const answer = await answerRepository.save(
        Answer.of('test', member, question),
      );

      //when&then
      const token = await authService.login(oauthRequestFixture);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/answer/${answer.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(403);
    });

    it('답변이 없으면 404에러를 반환한다.', async () => {
      //given

      //when&then
      const token = await authService.login(oauthRequestFixture);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/answer/${100000}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(404);
    });
  });
});
