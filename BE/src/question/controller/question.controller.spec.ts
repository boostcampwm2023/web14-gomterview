import { Test, TestingModule } from '@nestjs/testing';
import { QuestionController } from './question.controller';
import { QuestionService } from '../service/question.service';
import { TokenService } from '../../token/service/token.service';
import { CustomQuestionRequest } from '../dto/customQuestionRequest';
import { mockReqWithMemberFixture } from '../../member/fixture/member.fixture';
import { ContentEmptyException } from '../exception/question.exception';
import { CategoriesResponse } from '../dto/categoriesResponse';
import { UnauthorizedException } from '@nestjs/common';

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
    arr.forEach(async (value) => {
      const body = { content: value } as CustomQuestionRequest;

      mockQuestionService.createCustomQuestion.mockRejectedValue(
        new ContentEmptyException(),
      );

      await expect(
        controller.createCustomQuestion(mockReqWithMemberFixture, body),
      ).rejects.toThrow(ContentEmptyException);
    });
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
