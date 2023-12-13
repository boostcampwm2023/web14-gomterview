import { Test, TestingModule } from '@nestjs/testing';
import { WorkbookService } from './workbook.service';
import { CategoryRepository } from '../../category/repository/category.repository';
import { WorkbookRepository } from '../repository/workbook.repository';
import {
  categoryFixtureWithId,
  categoryListFixture,
} from '../../category/fixture/category.fixture';
import {
  createWorkbookRequestFixture,
  updateWorkbookRequestFixture,
  workbookFixture,
  workbookFixtureWithId,
  workbookInsertResult,
} from '../fixture/workbook.fixture';
import {
  differentMemberFixture,
  memberFixture,
  otherMemberFixture,
} from '../../member/fixture/member.fixture';
import { CategoryNotFoundException } from '../../category/exception/category.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MemberRepository } from '../../member/repository/member.repository';
import { AuthModule } from '../../auth/auth.module';
import { WorkbookModule } from '../workbook.module';
import { CategoryModule } from '../../category/category.module';
import { Workbook } from '../entity/workbook';
import {
  createIntegrationTestModule,
  createTypeOrmModuleForTest,
} from '../../util/test.util';
import * as cookieParser from 'cookie-parser';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';
import { WorkbookResponse } from '../dto/workbookResponse';
import {
  WorkbookForbiddenException,
  WorkbookNotFoundException,
} from '../exception/workbook.exception';
import { WorkbookTitleResponse } from '../dto/workbookTitleResponse';
import { UpdateWorkbookRequest } from '../dto/updateWorkbookRequest';
import { TokenModule } from '../../token/token.module';

describe('WorkbookService 단위테스트', () => {
  let module: TestingModule;
  let service: WorkbookService;
  const mockCategoryRepository = {
    findByCategoryId: jest.fn(),
  };
  const mockWorkbookRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findAll: jest.fn(),
    findAllByCategoryId: jest.fn(),
    findTop5Workbooks: jest.fn(),
    findMembersWorkbooks: jest.fn(),
    findSingleWorkbook: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    insert: jest.fn(),
    findByIdWithoutJoin: jest.fn(),
  };

  jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),
  }));

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [await createTypeOrmModuleForTest()],
      providers: [WorkbookService, CategoryRepository, WorkbookRepository],
    })
      .overrideProvider(CategoryRepository)
      .useValue(mockCategoryRepository)
      .overrideProvider(WorkbookRepository)
      .useValue(mockWorkbookRepository)
      .compile();
    service = module.get<WorkbookService>(WorkbookService);
  });

  beforeEach(() => {});

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('문제집 추가', () => {
    it('문제집을 추가할 때, Member와 dto가 제대로 입력되었다면 Workbook객체를 반환한다.', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );
      mockWorkbookRepository.insert.mockResolvedValue(workbookInsertResult);

      //then
      await expect(
        service.createWorkbook(createWorkbookRequestFixture, memberFixture),
      ).resolves.toEqual(workbookFixtureWithId.id);
    });

    it('문제집을 추가할 때, categoryId로 조회되지 않으면 CategoryNotFoundException을 반환한다', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(null);
      mockWorkbookRepository.insert.mockResolvedValue(workbookFixtureWithId);

      //then
      await expect(
        service.createWorkbook(createWorkbookRequestFixture, memberFixture),
      ).rejects.toThrow(new CategoryNotFoundException());
    });

    it('문제집을 추가할 때, Member가 비어있다면 Manipulated예외를 반환시킨다.', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );
      mockWorkbookRepository.insert.mockResolvedValue(workbookFixtureWithId);

      //then
      await expect(
        service.createWorkbook(createWorkbookRequestFixture, null),
      ).rejects.toThrow(new ManipulatedTokenNotFiltered());
    });
  });

  describe('카테고리를 통한 문제집 조회', () => {
    it('파라미터 없이 조회한다면 문제집 전체를 조회한다.', async () => {
      //given

      //when
      mockWorkbookRepository.findAll.mockResolvedValue([workbookFixture]);
      const workbooks = await service.findWorkbooks(null);
      //then
      expect(workbooks.length).toBe(1);
      expect(workbooks).toBeInstanceOf(Array);
      expect(workbooks[0].title).toEqual(workbookFixture.title);
      expect(workbooks[0].content).toEqual(workbookFixture.content);
    });

    it('파라미터를 가지고 조회한다면 해당 카테고리의 전체를 조회한다.', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );
      mockWorkbookRepository.findAllByCategoryId.mockResolvedValue([
        workbookFixture,
      ]);
      const workbooks = await service.findWorkbooks(1);
      //then
      expect(workbooks.length).toBe(1);
      expect(workbooks).toBeInstanceOf(Array);
      expect(workbooks[0].title).toEqual(workbookFixture.title);
      expect(workbooks[0].content).toEqual(workbookFixture.content);
    });

    it('카테고리가 없다면 CategoryNotFoundException을 반환한다.', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(null);
      mockWorkbookRepository.findAllByCategoryId.mockResolvedValue([
        workbookFixture,
      ]);
      //then
      await expect(service.findWorkbooks(1234)).rejects.toThrow(
        new CategoryNotFoundException(),
      );
    });
  });

  describe('회원을 통한 문제집 조회', () => {
    it('회원 정보가 null인 상태로 제목리스트를 조회하면 copyCount가 많은 순으로 5개의 문제집만이 조회된다.', async () => {
      //given

      //when
      mockWorkbookRepository.findTop5Workbooks.mockResolvedValue([
        workbookFixture,
        workbookFixture,
      ]);
      mockWorkbookRepository.findMembersWorkbooks.mockResolvedValue([
        workbookFixture,
      ]);

      //then
      const workbooks = await service.findWorkbookTitles(null);
      expect(workbooks.length).toBe(2);
    });

    it('member가 null이 아니라면 회원의 문제집만이 조회된다.', async () => {
      //given

      //when
      mockWorkbookRepository.findTop5Workbooks.mockResolvedValue([
        workbookFixture,
        workbookFixture,
      ]);
      mockWorkbookRepository.findMembersWorkbooks.mockResolvedValue([
        workbookFixture,
      ]);

      //then
      const workbooks = await service.findWorkbookTitles(memberFixture);
      expect(workbooks.length).toBe(1);
    });
  });

  describe('문제집 id로 문제집 조회', () => {
    it('문제집 id로 조회를 성공하면 WorkbookResponse로 반환된다.', async () => {
      //given

      //when
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixtureWithId);

      //then
      const result = await service.findSingleWorkbook(workbookFixtureWithId.id);
      expect(result).toBeInstanceOf(WorkbookResponse);
      expect(result.title).toBe(workbookFixtureWithId.title);
      expect(result.content).toBe(workbookFixtureWithId.content);
    });

    it('존재하지 않는 id라면 WorkbookNotFoundExceoption을 반환한다.', async () => {
      //given

      //when
      mockWorkbookRepository.findById.mockResolvedValue(null);

      //then
      await expect(service.findSingleWorkbook(135)).rejects.toThrow(
        new WorkbookNotFoundException(),
      );
    });
  });

  describe('문제집 수정', () => {
    it('문제집을 수정할 때 Member가 있고, 권한이 있다면 정상적으로 수정한다.', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixture);

      //then
      const result = await service.updateWorkbook(
        updateWorkbookRequestFixture,
        memberFixture,
      );
      expect(result.title).toBe('newT');
      expect(result.content).toBe('newC');
      expect(result.nickname).toBe(memberFixture.nickname);
      expect(result.categoryId).toBe(categoryFixtureWithId.id);
    });

    it('문제집을 수정할 때 Member가 없거나, 권한이 없다면 Forbidden예외처리한다.', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );
      mockWorkbookRepository.findById.mockResolvedValue(workbookFixture);
      const workbookUpdateRequest = new UpdateWorkbookRequest(
        workbookFixture.id,
        'newT',
        'newC',
        categoryFixtureWithId.id,
        true,
      );
      //then
      const cases = [otherMemberFixture, null];
      const result = [
        new WorkbookForbiddenException(),
        new ManipulatedTokenNotFiltered(),
      ];
      for (let index = 0; index < cases.length; index++) {
        await expect(
          service.updateWorkbook(workbookUpdateRequest, cases[index]),
        ).rejects.toThrow(result[index]);
      }
    });
  });

  describe('문제집 삭제', () => {
    it('문제집을 성공적으로 삭제한다.', async () => {
      //given

      //when
      mockWorkbookRepository.findByIdWithoutJoin.mockResolvedValue(
        workbookFixtureWithId,
      );
      mockWorkbookRepository.remove.mockResolvedValue(undefined);

      //then
      await expect(
        service.deleteWorkbookById(workbookFixtureWithId.id, memberFixture),
      ).resolves.toBeUndefined();
    });

    it('회원이 null이면 ManipulatedToken예외처리한다.', async () => {
      //given

      //when
      mockWorkbookRepository.findByIdWithoutJoin.mockResolvedValue(
        workbookFixtureWithId,
      );
      mockWorkbookRepository.remove.mockResolvedValue(undefined);

      //then
      await expect(
        service.deleteWorkbookById(workbookFixtureWithId.id, null),
      ).rejects.toThrow(new ManipulatedTokenNotFiltered());
    });

    it('회원이 다른 사람이라면  WorkbookForbidden예외처리한다.', async () => {
      //given

      //when
      mockWorkbookRepository.findByIdWithoutJoin.mockResolvedValue(
        workbookFixtureWithId,
      );
      mockWorkbookRepository.remove.mockResolvedValue(undefined);

      //then
      await expect(
        service.deleteWorkbookById(
          workbookFixtureWithId.id,
          otherMemberFixture,
        ),
      ).rejects.toThrow(new WorkbookForbiddenException());
    });

    it('문제집이 존재하지 않는다면 WorkbookNotFoundException예외처리한다.', async () => {
      //given

      //when
      mockWorkbookRepository.findByIdWithoutJoin.mockResolvedValue(null);
      mockWorkbookRepository.remove.mockResolvedValue(undefined);

      //then
      await expect(
        service.deleteWorkbookById(workbookFixtureWithId.id, memberFixture),
      ).rejects.toThrow(new WorkbookNotFoundException());
    });
  });
});

describe('WorkbookService 통합테스트', () => {
  let app: INestApplication;
  let categoryRepository: CategoryRepository;
  let memberRepository: MemberRepository;
  let workbookService: WorkbookService;
  let workbookRepository: WorkbookRepository;

  beforeAll(async () => {
    const modules = [AuthModule, WorkbookModule, CategoryModule, TokenModule];

    const moduleFixture: TestingModule =
      await createIntegrationTestModule(modules);

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    workbookService = moduleFixture.get<WorkbookService>(WorkbookService);
    workbookRepository =
      moduleFixture.get<WorkbookRepository>(WorkbookRepository);
  });

  describe('문제집 생성', () => {
    it('회원의 문제집을 생성한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);

      //when
      const createWorkbookRequest = new CreateWorkbookRequest(
        'test title',
        'test content',
        category.id,
        true,
      );
      const workbook = await workbookService.createWorkbook(
        createWorkbookRequest,
        member,
      );

      //then
      expect(workbook).toBe(1);
    });
  });

  describe('카테고리별 문제집 조회', () => {
    it('카테고리를 입력받지 않으면 전체 문제집을 조회한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      for (const each of categoryListFixture) {
        const category = await categoryRepository.save(each);
        for (let index = 1; index <= 3; index++) {
          await workbookRepository.save(
            Workbook.of(
              `${each.name}_${index}`,
              `${each.name}_${index}`,
              category,
              member,
              true,
            ),
          );
        }
      }

      //when
      const result = await workbookService.findWorkbooks(null);

      //then
      expect(result.length).toBe(categoryListFixture.length * 3);
      expect(result[0]).toBeInstanceOf(WorkbookResponse);
    });

    it('카테고리를 입력받으면 해당 카테고리의 문제집을 조회한다.', async () => {
      ///given
      const member = await memberRepository.save(memberFixture);
      let categoryId = 0;
      for (const each of categoryListFixture) {
        const category = await categoryRepository.save(each);
        categoryId = category.id;
        for (let index = 1; index <= 3; index++) {
          await workbookRepository.save(
            Workbook.of(
              `${each.name}_${index}`,
              `${each.name}_${index}`,
              category,
              member,
              true,
            ),
          );
        }
      }

      //when
      const result = await workbookService.findWorkbooks(categoryId);

      //then
      expect(result.length).toBe(3);
      expect(result[0]).toBeInstanceOf(WorkbookResponse);
    });

    it('입력받은 카테고리id가 존재하지 않으면 CategoryNotFound예외처리한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      for (const each of categoryListFixture) {
        const category = await categoryRepository.save(each);
        for (let index = 1; index <= 3; index++) {
          await workbookRepository.save(
            Workbook.of(
              `${each.name}_${index}`,
              `${each.name}_${index}`,
              category,
              member,
              true,
            ),
          );
        }
      }

      //when

      //then
      await expect(workbookService.findWorkbooks(135341)).rejects.toThrow(
        new CategoryNotFoundException(),
      );
    });
  });

  describe('회원/비회원의 내 문제집 조회', () => {
    it('회원 객체 없이 회원의 문제집을 조회하면 복사된 횟수 Top5의 문제집을 반환한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      for (const each of categoryListFixture) {
        const category = await categoryRepository.save(each);
        for (let index = 1; index <= 3; index++) {
          await workbookRepository.save(
            Workbook.of(
              `${each.name}_${index}`,
              `${each.name}_${index}`,
              category,
              member,
              true,
            ),
          );
        }
      }

      //when
      const result = await workbookService.findWorkbookTitles(null);

      //then
      expect(result.length).toBe(5);
      expect(result[0]).toBeInstanceOf(WorkbookTitleResponse);
    });

    it('회원객체를 가지고 문제집 제목들을 조회하면 회원의 문제집을 반환한다', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const other = await memberRepository.save(differentMemberFixture);
      for (const each of categoryListFixture) {
        const category = await categoryRepository.save(each);
        for (let index = 1; index <= 3; index++) {
          await workbookRepository.save(
            Workbook.of(
              `${each.name}_${index}`,
              `${each.name}_${index}`,
              category,
              member,
              true,
            ),
          );
        }
      }

      //when
      const result = await workbookService.findWorkbookTitles(member);
      const otherResult = await workbookService.findWorkbookTitles(other);
      //then
      expect(result.length).toBe(categoryListFixture.length * 3);
      expect(result[0]).toBeInstanceOf(WorkbookTitleResponse);
      expect(otherResult.length).toBe(0);
    });
  });

  describe('문제집 단건 조회', () => {
    it('문제집 id로 문제집을 조회하면 단건을 반환한다', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);

      //when
      const createWorkbookRequest = new CreateWorkbookRequest(
        'test title',
        'test content',
        category.id,
        true,
      );
      const workbookId = await workbookService.createWorkbook(
        createWorkbookRequest,
        member,
      );

      //then
      const result = await workbookService.findSingleWorkbook(workbookId);
      expect(result).toBeInstanceOf(WorkbookResponse);
      expect(result.title).toBe(createWorkbookRequest.title);
      expect(result.content).toBe(createWorkbookRequest.content);
      expect(result.workbookId).toBe(workbookId);
    });

    it('문제집 id가 존재하지 않으면 WorkbookNotFound예외처리한다.', async () => {
      //given

      //when

      //then
      await expect(workbookService.findSingleWorkbook(12345)).rejects.toThrow(
        new WorkbookNotFoundException(),
      );
    });
  });

  describe('문제집 수정', () => {
    it('문제집을 수정할 때 정상적으로 요청을 하면 성공한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when
      const result = await workbookService.updateWorkbook(
        updateWorkbookRequestFixture,
        member,
      );

      //then
      expect(result.title).toBe(updateWorkbookRequestFixture.title);
      expect(result.content).toBe(updateWorkbookRequestFixture.content);
      expect(result.categoryId).toBe(updateWorkbookRequestFixture.categoryId);
    });

    it('문제집을 수정할 때 존재하지 않는 카테고리id를 요청하면 CategoryNotFoundException처리한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixture);

      //when

      //then
      await expect(
        workbookService.updateWorkbook(
          new UpdateWorkbookRequest(
            workbookFixture.id,
            'newT',
            'newC',
            12345,
            true,
          ),
          member,
        ),
      ).rejects.toThrow(new CategoryNotFoundException());
    });

    it('문제집을 수정할 때 존재하지 않는 문제집id를 요청하면 WorkbookNotFound처리한다.', async () => {
      //given
      const member = await memberRepository.save(memberFixture);
      const category = await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixture);

      //when

      //then
      await expect(
        workbookService.updateWorkbook(
          new UpdateWorkbookRequest(123142, 'newT', 'newC', category.id, true),
          member,
        ),
      ).rejects.toThrow(new WorkbookNotFoundException());
    });

    it('문제집을 수정할 때 다른 회원의 문제집을 요청하면 WorkbookForbiddenException처리한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when

      //then
      await expect(
        workbookService.updateWorkbook(
          updateWorkbookRequestFixture,
          otherMemberFixture,
        ),
      ).rejects.toThrow(new WorkbookForbiddenException());
    });
  });

  describe('문제집 삭제', () => {
    it('문제집 삭제를 성공한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when

      //then
      await expect(
        workbookService.deleteWorkbookById(
          workbookFixtureWithId.id,
          memberFixture,
        ),
      ).resolves.toBeUndefined();
    });

    it('문제집 삭제시 회원이 없으면 Manipulated예외처리한다..', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when

      //then
      await expect(
        workbookService.deleteWorkbookById(workbookFixtureWithId.id, null),
      ).rejects.toThrow(new ManipulatedTokenNotFiltered());
    });

    it('다른 회원이 문제집 삭제를 요청하면 WorkbookForbidden예외처리한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when

      //then
      await expect(
        workbookService.deleteWorkbookById(
          workbookFixtureWithId.id,
          otherMemberFixture,
        ),
      ).rejects.toThrow(new WorkbookForbiddenException());
    });

    it('존재하지 않는 문제집 삭제를 요청하면 WorkbookNotFoundExeption예외처리한다.', async () => {
      //given
      await memberRepository.save(memberFixture);
      await categoryRepository.save(categoryFixtureWithId);
      await workbookRepository.save(workbookFixtureWithId);

      //when

      //then
      await expect(
        workbookService.deleteWorkbookById(1244232, memberFixture),
      ).rejects.toThrow(new WorkbookNotFoundException());
    });
  });

  afterEach(async () => {
    await workbookRepository.query('delete from Workbook');
    await workbookRepository.query('delete from Member');
    await workbookRepository.query('delete from Category');
  });
});
