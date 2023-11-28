import { Test, TestingModule } from '@nestjs/testing';
import { WorkbookController } from './workbook.controller';
import { WorkbookService } from '../service/workbook.service';
import { TokenService } from '../../token/service/token.service';
import {
  createWorkbookRequestFixture,
  workbookFixture,
} from '../fixture/workbook.fixture';
import {
  memberFixture,
  memberFixturesOAuthRequest,
  mockReqWithMemberFixture,
} from '../../member/fixture/member.fixture';
import { WorkbookIdResponse } from '../dto/workbookIdResponse';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CategoryRepository } from '../../category/repository/category.repository';
import { MemberRepository } from '../../member/repository/member.repository';
import { AuthModule } from '../../auth/auth.module';
import { WorkbookModule } from '../workbook.module';
import { CategoryModule } from '../../category/category.module';
import { Member } from '../../member/entity/member';
import { Workbook } from '../entity/workbook';
import { Category } from '../../category/entity/category';
import { createIntegrationTestModule } from '../../util/test.util';
import * as cookieParser from 'cookie-parser';
import { TokenModule } from '../../token/token.module';
import { Token } from '../../token/entity/token';
import { AuthService } from '../../auth/service/auth.service';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import * as request from 'supertest';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';

describe('WorkbookController 단위테스트', () => {
  let controller: WorkbookController;
  const mockWorkbookService = {
    createWorkbook: jest.fn(),
  };
  const mockTokenService = {};

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkbookService, TokenService],
      controllers: [WorkbookController],
    })
      .overrideProvider(WorkbookService)
      .useValue(mockWorkbookService)
      .overrideProvider(TokenService)
      .useValue(mockTokenService)
      .compile();

    controller = module.get<WorkbookController>(WorkbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('문제집 추가', () => {
    it('문제집을 추가할 때 회원 객체와 dto가 있으면 workbookId를 반환한다.', async () => {
      //given

      //when
      mockWorkbookService.createWorkbook.mockResolvedValue(workbookFixture);
      const response = await controller.createAnswer(
        createWorkbookRequestFixture,
        mockReqWithMemberFixture,
      );

      //then
      expect(response).toBeInstanceOf(WorkbookIdResponse);
      expect(response.workbookId).toBe(workbookFixture.id);
    });
  });
});

describe('WorkbookController 통합테스트', () => {
  let app: INestApplication;
  let authService: AuthService;
  let memberRepository: MemberRepository;
  let categoryRepository: CategoryRepository;

  beforeAll(async () => {
    const modules = [AuthModule, WorkbookModule, CategoryModule, TokenModule];
    const entities = [Member, Workbook, Category, Token];

    const moduleFixture: TestingModule = await createIntegrationTestModule(
      modules,
      entities,
    );

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
  });

  it('토큰과 dto를 정상적으로 넣으면 201코드와 WorkbookIdResponse를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    const token = await authService.login(memberFixturesOAuthRequest);

    //when & then
    const agent = request.agent(app.getHttpServer());
    await agent
      .post('/api/workbook')
      .set('Cookie', [`accessToken=${token}`])
      .send(createWorkbookRequestFixture)
      .expect(201);
  });

  it('토큰이 없으면 401에러를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);

    //when & then
    const agent = request.agent(app.getHttpServer());
    await agent
      .post('/api/workbook')
      .send(createWorkbookRequestFixture)
      .expect(401);
  });

  it('요청 dto의 title이 빈 문자열/null이면 400에러를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    const token = await authService.login(memberFixturesOAuthRequest);

    //when & then
    const cases = ['', null];
    const agent = request.agent(app.getHttpServer());
    for (const title of cases) {
      const createWorkbookRequest = new CreateWorkbookRequest(
        title,
        'test content',
        categoryFixtureWithId.id,
      );
      await agent
        .post('/api/workbook')
        .set('Cookie', [`accessToken=${token}`])
        .send(createWorkbookRequest)
        .expect(400);
    }
  });

  it('요청 dto의 content가 빈 문자열/null이면 400에러를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    const token = await authService.login(memberFixturesOAuthRequest);

    //when & then
    const cases = ['', null];
    const agent = request.agent(app.getHttpServer());
    for (const content of cases) {
      const createWorkbookRequest = new CreateWorkbookRequest(
        'test title',
        content,
        categoryFixtureWithId.id,
      );
      await agent
        .post('/api/workbook')
        .set('Cookie', [`accessToken=${token}`])
        .send(createWorkbookRequest)
        .expect(400);
    }
  });

  it('category가 존재하지 않으면 404에러를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    const token = await authService.login(memberFixturesOAuthRequest);

    //when & then
    const agent = request.agent(app.getHttpServer());
    const createWorkbookRequest = new CreateWorkbookRequest(
      'test title',
      'test content',
      12345,
    );
    await agent
      .post('/api/workbook')
      .set('Cookie', [`accessToken=${token}`])
      .send(createWorkbookRequest)
      .expect(404);
  });
});
