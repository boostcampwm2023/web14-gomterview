import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from '../service/question.service';
import { TokenService } from '../../token/service/token.service';
import { CustomQuestionRequest } from '../dto/customQuestionRequest';
import {
  memberFixture,
  mockReqWithMemberFixture,
  oauthRequestFixture,
} from '../../member/fixture/member.fixture';
import { ContentEmptyException } from '../exception/question.exception';
import { CategoriesResponse } from '../dto/categoriesResponse';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { QuestionRepository } from '../repository/question.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from '../../member/entity/member';
import { Question } from '../entity/question';
import {
  customQuestionRequestFixture,
  multiQuestionFixture,
  questionFixture,
} from '../fixture/question.fixture';
import * as request from 'supertest';
import { MemberModule } from '../../member/member.module';
import { TokenModule } from '../../token/token.module';
import { QuestionModule } from '../question.module';
import { AuthModule } from '../../auth/auth.module';
import { AuthService } from '../../auth/service/auth.service';
import { MemberRepository } from '../../member/repository/member.repository';
import { Token } from '../../token/entity/token';

describe('QuestionController 단위테스트', () => {
  let controller: QuestionController;

  const mockQuestionService = {
    createCustomQuestion: jest.fn(),
    findCategories: jest.fn(),
    deleteById: jest.fn(),
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

  it('커스텀 질문을 생성할 때 토큰이 있고, body의 content가 문자열로 존재한다면 성공적으로 저장된다.', async () => {
    mockQuestionService.createCustomQuestion.mockResolvedValue(undefined);

    const body = { content: 'test content' } as CustomQuestionRequest;
    const result = await controller.createCustomQuestion(
      mockReqWithMemberFixture,
      body,
    );
    expect(result).toEqual(undefined);
  });

  it('커스텀 질문 생성 실패 => body === undefined | "" | null', async () => {
    const arr = [undefined, '', null];
    for (const value of arr) {
      const body = { content: value } as CustomQuestionRequest;

      mockQuestionService.createCustomQuestion.mockRejectedValue(
        new ContentEmptyException(),
      );

      await expect(
        controller.createCustomQuestion(mockReqWithMemberFixture, body),
      ).rejects.toThrow(ContentEmptyException);
    }
  });

  /*
                                  TODO: 카테고리별 질문 조회는 후에 Answer API를 생성 후에, Default Answer까지 붙여서 한번에 테스트하기 위해 보류
                                   */

  it('전체 카테고리를 조회한다.', async () => {
    mockQuestionService.findCategories.mockResolvedValue([
      'CS',
      'BE',
      'FE',
      '나만의 질문',
    ]);
    const result = await controller.findAllCategories();
    expect(result).toEqual(
      new CategoriesResponse(['CS', 'BE', 'FE', '나만의 질문']),
    );
  });

  it('나만의 질문을 삭제한다', async () => {
    mockQuestionService.deleteById.mockResolvedValue(undefined);
    const result = await controller.deleteQuestion(1, mockReqWithMemberFixture);
    expect(result).toEqual(undefined);
  });

  it('나만의 질문을 삭제 실패 => Unauthorized', async () => {
    mockQuestionService.deleteById.mockRejectedValue(
      new UnauthorizedException(),
    );
    await expect(
      controller.deleteQuestion(1, mockReqWithMemberFixture),
    ).rejects.toThrow(UnauthorizedException);
  });
});

describe('Question Controller 통합 테스트', () => {
  let app: INestApplication;
  let questionRepository: QuestionRepository;
  let authService: AuthService;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        MemberModule,
        TokenModule,
        QuestionModule,
        AuthModule,
        TypeOrmModule.forRoot({
          type: 'sqlite', // 또는 다른 테스트용 데이터베이스 설정
          database: ':memory:', // 메모리 데이터베이스 사용
          entities: [Member, Question, Token],
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    authService = moduleFixture.get<AuthService>(AuthService);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  it('해당 게시물을 저장한다.', (done) => {
    memberRepository
      .save(memberFixture)
      .then(() => {
        return authService.login(oauthRequestFixture);
      })
      .then((token) => {
        request
          .agent(app.getHttpServer())
          .post('/api/question')
          .set('Cookie', [`accessToken=${token}`])
          .send(customQuestionRequestFixture)
          .expect(201);
      })
      .then(done);
  });

  it('전체 카테고리를 조회한다.', async () => {
    const savePromises = multiQuestionFixture.map((question) =>
      questionRepository.save(question),
    );

    await Promise.all(savePromises);
    request
      .agent(app.getHttpServer())
      .get('/api/question/category')
      .expect(200)
      .then((response) => {
        expect(response.body.categories).toEqual([
          'BE',
          'CS',
          'FE',
          '나만의 질문',
        ]);
      });
  });

  it('해당 게시물을 삭제한다.', (done) => {
    memberRepository
      .save(memberFixture)
      .then(() => questionRepository.save(questionFixture))
      .then(() => {
        return authService.login(oauthRequestFixture);
      })
      .then((token) => {
        request
          .agent(app.getHttpServer())
          .delete(`/api/question?id=${questionFixture.id}`)
          .set('Cookie', [`accessToken=${token}`])
          .expect(204);
      })
      .then(done);
  });

  afterEach(async () => {
    // 테스트용 데이터베이스의 테이블 데이터를 지우는 로직 추가
    await questionRepository.query('delete from token');
    await questionRepository.query('delete from Question');
    await questionRepository.query('delete from Member');
  });

  afterAll(async () => {
    await app.close();
  });
});
