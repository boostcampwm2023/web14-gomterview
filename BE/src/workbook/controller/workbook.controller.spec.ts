import { Test, TestingModule } from '@nestjs/testing';
import { WorkbookController } from './workbook.controller';
import { WorkbookService } from '../service/workbook.service';
import { TokenService } from '../../token/service/token.service';
import {
  createWorkbookRequestFixture,
  workbookFixture,
} from '../fixture/workbook.fixture';
import { mockReqWithMemberFixture } from '../../member/fixture/member.fixture';
import { WorkbookIdResponse } from '../dto/workbookIdResponse';

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
