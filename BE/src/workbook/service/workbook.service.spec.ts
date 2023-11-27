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

describe('WorkbookService', () => {
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
