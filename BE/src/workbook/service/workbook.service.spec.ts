import { Test, TestingModule } from '@nestjs/testing';
import { WorkbookService } from './workbook.service';
import { CategoryRepository } from '../../category/repository/category.repository';
import { WorkbookRepository } from '../repository/workbook.repository';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import {
  createWorkbookRequestFixture,
  workbookFixtureWithId,
} from '../fixture/workbook.fixture';
import { memberFixture } from '../../member/fixture/member.fixture';
import { CategoryNotFoundException } from '../../category/exception/category.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { MemberRepository } from '../../member/repository/member.repository';
import { AuthModule } from '../../auth/auth.module';
import { WorkbookModule } from '../workbook.module';
import { CategoryModule } from '../../category/category.module';
import { Member } from '../../member/entity/member';
import { Workbook } from '../entity/workbook';
import { createIntegrationTestModule } from '../../util/test.util';
import * as cookieParser from 'cookie-parser';
import { Category } from '../../category/entity/category';
import { CreateWorkbookRequest } from '../dto/createWorkbookRequest';

describe('WorkbookService 단위테스트', () => {
  let service: WorkbookService;
  const mockCategoryRepository = {
    findByCategoryId: jest.fn(),
  };
  const mockWorkbookRepository = {
    save: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WorkbookService, CategoryRepository, WorkbookRepository],
    })
      .overrideProvider(CategoryRepository)
      .useValue(mockCategoryRepository)
      .overrideProvider(WorkbookRepository)
      .useValue(mockWorkbookRepository)
      .compile();

    service = module.get<WorkbookService>(WorkbookService);
  });

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
      mockWorkbookRepository.save.mockResolvedValue(workbookFixtureWithId);

      //then
      await expect(
        service.createWorkbook(createWorkbookRequestFixture, memberFixture),
      ).resolves.toEqual(workbookFixtureWithId);
    });

    it('문제집을 추가할 때, categoryId로 조회되지 않으면 CategoryNotFoundException을 반환한다', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(null);
      mockWorkbookRepository.save.mockResolvedValue(workbookFixtureWithId);

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
      mockWorkbookRepository.save.mockResolvedValue(workbookFixtureWithId);

      //then
      await expect(
        service.createWorkbook(createWorkbookRequestFixture, null),
      ).rejects.toThrow(new ManipulatedTokenNotFiltered());
    });
  });
});

describe('WorkbookService 통합테스트', () => {
  let app: INestApplication;
  let categoryRepository: CategoryRepository;
  let memberRepository: MemberRepository;
  let workbookService: WorkbookService;

  beforeAll(async () => {
    const modules = [AuthModule, WorkbookModule, CategoryModule];
    const entities = [Member, Workbook, Category];

    const moduleFixture: TestingModule = await createIntegrationTestModule(
      modules,
      entities,
    );

    app = moduleFixture.createNestApplication();
    app.use(cookieParser());
    app.useGlobalPipes(new ValidationPipe());
    await app.init();

    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    workbookService = moduleFixture.get<WorkbookService>(WorkbookService);
  });

  it('회원의 문제집을 생성한다.', async () => {
    //given
    const member = await memberRepository.save(memberFixture);
    const category = await categoryRepository.save(categoryFixtureWithId);

    //when
    const createWorkbookRequest = new CreateWorkbookRequest(
      'test name',
      'test content',
      category.id,
    );
    const workbook = await workbookService.createWorkbook(
      createWorkbookRequest,
      member,
    );

    //then
    expect(workbook.name).toEqual('test name');
    expect(workbook.content).toEqual('test content');
    expect(workbook.member.id).toEqual(member.id);
  });
});
