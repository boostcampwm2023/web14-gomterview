import { Test, TestingModule } from '@nestjs/testing';
import { WorkbookController } from './workbook.controller';
import { WorkbookService } from '../service/workbook.service';
import { TokenService } from '../../token/service/token.service';
import {
  createWorkbookRequestFixture,
  updateWorkbookRequestFixture,
  workbookFixture,
  workbookFixtureWithId,
} from '../fixture/workbook.fixture';
import {
  differentMemberFixture,
  memberFixture,
  memberFixturesOAuthRequest,
  mockReqWithMemberFixture,
  oauthRequestFixture,
  otherMemberFixture,
} from '../../member/fixture/member.fixture';
import { WorkbookIdResponse } from '../dto/workbookIdResponse';
import { Request, Response } from 'express';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { CategoryRepository } from '../../category/repository/category.repository';
import { MemberRepository } from '../../member/repository/member.repository';
import { AuthModule } from '../../auth/auth.module';
import { WorkbookModule } from '../workbook.module';
import { CategoryModule } from '../../category/category.module';
import { Workbook } from '../entity/workbook';
import { createIntegrationTestModule } from '../../util/test.util';
import * as cookieParser from 'cookie-parser';
import { TokenModule } from '../../token/token.module';
import { AuthService } from '../../auth/service/auth.service';
import {
  categoryFixtureWithId,
  categoryListFixture,
} from '../../category/fixture/category.fixture';
import * as request from 'supertest';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';
import {
  WorkbookForbiddenException,
  WorkbookNotFoundException,
} from '../exception/workbook.exception';
import { WorkbookResponse } from '../dto/workbookResponse';
import { WorkbookTitleResponse } from '../dto/workbookTitleResponse';
import { CategoryNotFoundException } from '../../category/exception/category.exception';
import { WorkbookRepository } from '../repository/workbook.repository';
import { UpdateWorkbookRequest } from '../dto/updateWorkbookRequest';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';

describe('WorkbookController 단위테스트', () => {
  let controller: WorkbookController;
  const mockWorkbookService = {
    createWorkbook: jest.fn(),
    findWorkbooks: jest.fn(),
    findWorkbookTitles: jest.fn(),
    findSingleWorkbook: jest.fn(),
    updateWorkbook: jest.fn(),
    deleteWorkbookById: jest.fn(),
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
      mockWorkbookService.createWorkbook.mockResolvedValue(
        workbookFixtureWithId.id,
      );
      const response = await controller.createAnswer(
        createWorkbookRequestFixture,
        mockReqWithMemberFixture,
      );

      //then
      expect(response).toBeInstanceOf(WorkbookIdResponse);
      expect(response.workbookId).toBe(workbookFixtureWithId.id);
    });
  });

  describe('카테고리별 문제집 조회', () => {
    it('조회를 성공한다', async () => {
      //given

      //when
      mockWorkbookService.findWorkbooks.mockResolvedValue(
        [workbookFixture, workbookFixture, workbookFixture].map(
          WorkbookResponse.of,
        ),
      );

      //then
      const result = await controller.findWorkbooks(null);
      expect(result.length).toBe(3);
      expect(result[0]).toBeInstanceOf(WorkbookResponse);
      expect(result[0].title).toBe(workbookFixture.title);
      expect(result[0].content).toBe(workbookFixture.content);
    });

    it('카테고리가 존재하지 않으면 CategoryNotFoundException을 반환한다', async () => {
      //given

      //when
      mockWorkbookService.findWorkbooks.mockRejectedValue(
        new CategoryNotFoundException(),
      );

      //then
      await expect(controller.findWorkbooks(12412)).rejects.toThrow(
        new CategoryNotFoundException(),
      );
    });
  });

  describe('회원/비회원의 문제집 조회', () => {
    it('회원을 입력해주면 해당 회원의 문제집을 보여준다.', async () => {
      //given

      //when
      mockWorkbookService.findWorkbookTitles.mockResolvedValue([
        WorkbookTitleResponse.of(workbookFixture),
      ]);
      const response = await controller.findMembersWorkbook(
        mockReqWithMemberFixture,
      );

      //then
      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(WorkbookTitleResponse);
      expect(response[0].workbookId).toBe(workbookFixture.id);
      expect(response[0].title).toBe(workbookFixture.title);
    });

    it('비회원은 복사횟수 Top5의 문제집들을 보여준다.', async () => {
      //given

      //when
      mockWorkbookService.findWorkbookTitles.mockResolvedValue([
        WorkbookTitleResponse.of(workbookFixture),
      ]);
      const response = await controller.findMembersWorkbook(null);

      //then
      expect(response).toBeInstanceOf(Array);
      expect(response[0]).toBeInstanceOf(WorkbookTitleResponse);
      expect(response[0].workbookId).toBe(workbookFixture.id);
      expect(response[0].title).toBe(workbookFixture.title);
    });
  });

  describe('문제집 단건 조회', () => {
    it('id로 문제집이 있다면 조회한다.', async () => {
      //given

      //when
      mockWorkbookService.findSingleWorkbook.mockResolvedValue(
        WorkbookResponse.of(
          Workbook.of(
            'title',
            null,
            categoryFixtureWithId,
            memberFixture,
            true,
          ),
        ),
      );

      //then
      const result = await controller.findSingleWorkbook(1);
      expect(result).toBeInstanceOf(WorkbookResponse);
      expect(result.title).toBe('title');
      expect(result.content).toBe('');
    });

    it('문제집이 없다면 WorkbookNotFoundException을 반환한다.', async () => {
      //given

      //when
      mockWorkbookService.findSingleWorkbook.mockRejectedValue(
        new WorkbookNotFoundException(),
      );

      //then
      await expect(controller.findSingleWorkbook(1234)).rejects.toThrow(
        new WorkbookNotFoundException(),
      );
    });
  });

  describe('문제집을 수정한다.', () => {
    it('문제집을 수정하면 WorkbookResponse타입의 객체로 반환된다.', async () => {
      //given

      //when
      mockWorkbookService.updateWorkbook.mockResolvedValue(
        WorkbookResponse.of(workbookFixtureWithId),
      );
      const result = await controller.updateAnswer(
        updateWorkbookRequestFixture,
        mockReqWithMemberFixture,
      );

      //then
      expect(result).toBeInstanceOf(WorkbookResponse);
      expect(result.title).toBe(workbookFixtureWithId.title);
      expect(result.content).toBe(workbookFixtureWithId.content);
    });
  });

  describe('문제집을 삭제한다', () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    it('member와 id를 주면 문제집을 삭제한다', async () => {
      //given

      //when
      mockWorkbookService.deleteWorkbookById.mockResolvedValue(undefined);

      //then
      await expect(
        controller.deleteAnswer(mockReqWithMemberFixture, 1, response),
      ).resolves.toBeUndefined();
    });

    it('member가 null이면 ManipulatedToken예외처리한다', async () => {
      //given

      //when
      mockWorkbookService.deleteWorkbookById.mockRejectedValue(
        new ManipulatedTokenNotFiltered(),
      );

      //then
      await expect(
        controller.deleteAnswer(
          { user: null } as unknown as Request,
          1,
          response,
        ),
      ).rejects.toThrow(new ManipulatedTokenNotFiltered());
    });

    it('다른 회원이 삭제요청하면 WorkbookForbiddenException처리한다', async () => {
      //given

      //when
      mockWorkbookService.deleteWorkbookById.mockRejectedValue(
        new WorkbookForbiddenException(),
      );

      //then
      await expect(
        controller.deleteAnswer(
          { user: otherMemberFixture } as unknown as Request,
          1,
          response,
        ),
      ).rejects.toThrow(new WorkbookForbiddenException());
    });

    it('없는 문제집을 삭제요청하면 WorkbookNotFoundException처리한다', async () => {
      //given

      //when
      mockWorkbookService.deleteWorkbookById.mockRejectedValue(
        new WorkbookNotFoundException(),
      );

      //then
      await expect(
        controller.deleteAnswer(mockReqWithMemberFixture, 11412, response),
      ).rejects.toThrow(new WorkbookNotFoundException());
    });
  });
});

describe('WorkbookController 통합테스트', () => {
  let app: INestApplication;
  let authService: AuthService;
  let memberRepository: MemberRepository;
  let categoryRepository: CategoryRepository;
  let workbookRepository: WorkbookRepository;

  beforeAll(async () => {
    const modules = [AuthModule, WorkbookModule, CategoryModule, TokenModule];

    const moduleFixture: TestingModule =
      await createIntegrationTestModule(modules);

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    workbookRepository =
      moduleFixture.get<WorkbookRepository>(WorkbookRepository);
  });

  describe('문제집을 추가한다', () => {
    beforeEach(async () => {
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
    });

    it('토큰과 dto를 정상적으로 넣으면 201코드와 WorkbookIdResponse를 반환한다.', async () => {
      //given
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

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/workbook')
        .send(createWorkbookRequestFixture)
        .expect(401);
    });

    it('요청 dto의 title이 빈 문자열/null이면 400에러를 반환한다.', async () => {
      //given
      const token = await authService.login(memberFixturesOAuthRequest);

      //when & then
      const cases = ['', null];
      const agent = request.agent(app.getHttpServer());
      for (const title of cases) {
        const createWorkbookRequest = new CreateWorkbookRequest(
          title,
          'test content',
          categoryFixtureWithId.id,
          true,
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
        true,
      );
      await agent
        .post('/api/workbook')
        .set('Cookie', [`accessToken=${token}`])
        .send(createWorkbookRequest)
        .expect(404);
    });
  });

  describe('카테고리별 문제집을 조회한다', () => {
    beforeEach(async () => {
      const member = await memberRepository.save(memberFixture);
      for (const eachCategory of categoryListFixture) {
        const category = await categoryRepository.save(eachCategory);
        await workbookRepository.save(
          Workbook.of(
            `title_${category.name}`,
            `content_${category.name}`,
            category,
            member,
            true,
          ),
        );
      }
    });

    it('카테고리id를 입력해주지 않으면 전체를 조회한다.', async () => {
      //given

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get('/api/workbook')
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(categoryListFixture.length);
          expect(response.body[0].title).toBe('title_BE');
          expect(response.body[1].title).toBe('title_CS');
          expect(response.body[2].title).toBe('title_FE');
          expect(response.body[3].title).toBe('title_나만의 질문');
        });
    });

    it('특정 카테고리를 입력해주면 해당 카테고리의 문제집들을 조회한다.', async () => {
      //given
      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get('/api/workbook?category=1').expect(200);
    });

    it('카테고리id가 존재하지 않는 값이라면 404에러를 반환한다.', async () => {
      //given

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get('/api/workbook?category=15314').expect(404);
    });
  });

  describe('회원의 문제집을 조회한다', () => {
    beforeEach(async () => {
      const member = await memberRepository.save(memberFixture);
      for (const eachCategory of categoryListFixture) {
        const category = await categoryRepository.save(eachCategory);
        await workbookRepository.save(
          Workbook.of(
            `title_${category.name}`,
            `content_${category.name}`,
            category,
            member,
            true,
          ),
        );
      }
      const other = await memberRepository.save(differentMemberFixture);
      const category = await categoryRepository.findByCategoryId(1);
      await workbookRepository.save(
        Workbook.of(
          `other${category.name}`,
          `other${category.name}`,
          category,
          other,
          true,
        ),
      );
    });

    it('쿠키가 있을 경우 회원의 문제집을 조회한다.', async () => {
      //given

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .get('/api/workbook/title')
        .set('Cookie', [`accessToken=${token}`])
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(categoryListFixture.length);
          expect(response.body[0].title).toBe('title_BE');
          expect(response.body[1].title).toBe('title_CS');
          expect(response.body[2].title).toBe('title_FE');
          expect(response.body[3].title).toBe('title_나만의 질문');
        });
    });

    it('쿠키가 없을 경우 복사횟수 Top5의 문제집을 조회한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      for (const eachCategory of categoryListFixture) {
        const category = await categoryRepository.save(eachCategory);
        const workbook = Workbook.of(
          `title_${category.name}`,
          `content_${category.name}`,
          category,
          member,
          true,
        );
        for (
          let index = 0;
          index < categoryListFixture.indexOf(eachCategory);
          index++
        ) {
          workbook.increaseCopyCount();
        }

        await workbookRepository.save(workbook);
      }

      const other = await memberRepository.save(differentMemberFixture);
      const category = await categoryRepository.findByCategoryId(1);
      const workbook = Workbook.of(
        `other${category.name}`,
        `other${category.name}`,
        category,
        other,
        true,
      );
      for (let index = 0; index < 10; index++) {
        workbook.increaseCopyCount();
      }
      await workbookRepository.save(workbook);

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get('/api/workbook/title')
        .expect(200)
        .then((response) => {
          expect(response.body.length).toBe(categoryListFixture.length + 1);
          expect(response.body[4].title).toBe('title_BE');
          expect(response.body[3].title).toBe('title_CS');
          expect(response.body[2].title).toBe('title_FE');
          expect(response.body[1].title).toBe('title_나만의 질문');
          expect(response.body[0].title).toBe(`other${category.name}`);
        });
    });
  });

  describe('단건의 문제집을 조회한다', () => {
    beforeEach(() => {});

    it('존재하는 경우 단건을 반환한다.', async () => {
      //given
      const other = await memberRepository.save(differentMemberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);
      const workbook = Workbook.of(
        `other${category.name}`,
        `other${category.name}`,
        category,
        other,
        true,
      );
      await workbookRepository.save(workbook);

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/workbook/${workbook.id}`)
        .expect(200)
        .then((response) => {
          expect(response.body.title).toBe(workbook.title);
          expect(response.body.content).toBe(workbook.content);
        });
    });

    it('존재하지 않는 문제집의 id일 경우 404에러를 반환한다.', async () => {
      //given

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get(`/api/workbook/1252143`).expect(404);
    });
  });

  describe('문제집을 수정한다', () => {
    it('수정에 성공하면 WorkbookResponse형태로 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .patch(`/api/workbook/`)
        .set('Cookie', [`accessToken=${token}`])
        .send(updateWorkbookRequestFixture)
        .expect(200)
        .then((response) => {
          expect(response.body.title).toBe(updateWorkbookRequestFixture.title);
          expect(response.body.content).toBe(
            updateWorkbookRequestFixture.content,
          );
        });
    });

    it('토큰이 없으면 401에러를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .patch(`/api/workbook/`)
        .send(updateWorkbookRequestFixture)
        .expect(401);
    });

    it('다른 사람의 문제집을 수정요청하면 403에러를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when & then
      const token = await authService.login(oauthRequestFixture);
      const agent = request.agent(app.getHttpServer());
      await agent
        .patch(`/api/workbook/`)
        .set('Cookie', [`accessToken=${token}`])
        .send(updateWorkbookRequestFixture)
        .expect(403);
    });

    it('제목이 null, 빈 문자열, 공백 문자열일 때 400에러처리한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixtureWithId);

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);
      const cases = [null, ''];

      for (const each of cases) {
        const updateWorkbookRequest = new UpdateWorkbookRequest(
          workbook.id,
          each,
          'test content',
          category.id,
          true,
        );

        const agent = request.agent(app.getHttpServer());
        await agent
          .patch(`/api/workbook/`)
          .set('Cookie', [`accessToken=${token}`])
          .send(updateWorkbookRequest)
          .expect(400);
      }
    });

    it('존재하지 않는 문제집id를 요청하면 404에러를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);

      const updateWorkbookRequest = new UpdateWorkbookRequest(
        124214,
        'test title',
        'test content',
        category.id,
        true,
      );

      const agent = request.agent(app.getHttpServer());
      await agent
        .patch(`/api/workbook/`)
        .set('Cookie', [`accessToken=${token}`])
        .send(updateWorkbookRequest)
        .expect(404);
    });

    it('존재하지 않는 카테고리id를 요청하면 404에러를 반환한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      const workbook = await workbookRepository.save(workbookFixtureWithId);

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);

      const updateWorkbookRequest = new UpdateWorkbookRequest(
        workbook.id,
        'test title',
        'test content',
        151231,
        true,
      );

      const agent = request.agent(app.getHttpServer());
      await agent
        .patch(`/api/workbook/`)
        .set('Cookie', [`accessToken=${token}`])
        .send(updateWorkbookRequest)
        .expect(404);
    });
  });

  describe('문제집을 삭제한다', () => {
    beforeEach(async () => {
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
    });

    it('문제집을 성공적으로 삭제한다', async () => {
      //given
      const workbook = await workbookRepository.save(workbookFixtureWithId);

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/workbook/${workbook.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(204);
    });

    it('쿠키가 없으면 401에러를 반환한다', async () => {
      //given
      const workbook = await workbookRepository.save(workbookFixtureWithId);

      //when & then
      const agent = request.agent(app.getHttpServer());
      await agent.delete(`/api/workbook/${workbook.id}`).expect(401);
    });

    it('다른 사람의 문제집 삭제 요청을 하면 403에러를 반환한다', async () => {
      //given
      const workbook = await workbookRepository.save(workbookFixtureWithId);

      //when & then
      const token = await authService.login(oauthRequestFixture);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/workbook/${workbook.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(403);
    });

    it('존재하지 않는 문제집을 삭제하려하면 404에러를 반환한다', async () => {
      //given

      //when & then
      const token = await authService.login(memberFixturesOAuthRequest);
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/workbook/124123`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(404);
    });
  });

  afterEach(async () => {
    await workbookRepository.query('delete from Workbook');
    await workbookRepository.query('delete from Member');
    await workbookRepository.query('delete from Category');
    await workbookRepository.query('DELETE FROM sqlite_sequence'); // Auto Increment 초기화
  });
});
