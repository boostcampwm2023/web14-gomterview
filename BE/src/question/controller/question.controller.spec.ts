import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from '../service/question.service';
import { TokenService } from '../../token/service/token.service';
import { QuestionResponse } from '../dto/questionResponse';
import {
  createQuestionRequestFixture,
  questionFixture,
} from '../util/question.util';
import { INestApplication } from '@nestjs/common';
import { TokenModule } from '../../token/token.module';
import { Member } from '../../member/entity/member';
import { Token } from '../../token/entity/token';
import { createIntegrationTestModule } from '../../util/test.util';
import { QuestionModule } from '../question.module';
import { CategoryRepository } from '../../category/repository/category.repository';
import { MemberRepository } from '../../member/repository/member.repository';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/service/auth.service';
import { oauthRequestFixture } from '../../member/fixture/member.fixture';
import * as request from 'supertest';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { Question } from '../entity/question';
import { Category } from '../../category/entity/category';

describe('QuestionController', () => {
  let controller: QuestionController;
  const mockQuestionService = {
    createQuestion: jest.fn(),
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
      controller.createCustomQuestion(createQuestionRequestFixture),
    ).resolves.toEqual(QuestionResponse.from(questionFixture));
  });
});

describe('QuestionController 통합테스트', () => {
  let app: INestApplication;
  let categoryRepository: CategoryRepository;
  let memberRepository: MemberRepository;
  let authService: AuthService;

  beforeAll(async () => {
    const modules = [QuestionModule, TokenModule, AuthModule];
    const entities = [Member, Token, Category, Question];

    const moduleFixture: TestingModule = await createIntegrationTestModule(
      modules,
      entities,
    );

    app = moduleFixture.createNestApplication();
    await app.init();

    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    authService = moduleFixture.get<AuthService>(AuthService);
  });

  beforeEach(async () => {
    await categoryRepository.query('delete from Question');
    await categoryRepository.query('delete from Category');
    await categoryRepository.query('delete from Member');
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
      .then((response) => {
        console.log(response);
      });
    //then
  });
});
