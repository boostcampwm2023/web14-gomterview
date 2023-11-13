import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionRepository } from '../repository/question.repository';
import { MemberRepository } from '../../member/repository/member.repository';
import { CustomQuestionRequest } from '../dto/customQuestionRequest';
import { ContentEmptyException } from '../exception/question.exception';
import { UnauthorizedException } from '@nestjs/common';
import { memberFixture } from '../../member/fixture/member.fixture';
import {
  customQuestionRequestFixture,
  multiQuestionFixture,
  questionFixture,
} from '../fixture/question.fixture';
import { AppModule } from '../../app.module';

describe('QuestionService 단위 테스트', () => {
  let service: QuestionService;
  const mockQuestionRepository = {
    save: jest.fn(),
    findCategories: jest.fn(),
    findQuestionByIdAndMember_Id: jest.fn(),
    remove: jest.fn(),
  };

  const mockMemberRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, QuestionRepository, MemberRepository],
    })
      .overrideProvider(QuestionRepository)
      .useValue(mockQuestionRepository)
      .overrideProvider(MemberRepository)
      .useValue(mockMemberRepository)
      .compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('나만의 질문을 저장한다.', async () => {
    mockQuestionRepository.save.mockResolvedValue(undefined);
    const result = await service.createCustomQuestion(
      customQuestionRequestFixture,
      memberFixture,
    );
    expect(result).toEqual(undefined);
  });

  it('나만의 질문 저장 실패 => content가 없을 때', async () => {
    const customQuestionRequest = {
      content: undefined,
    } as CustomQuestionRequest;
    mockQuestionRepository.save.mockResolvedValue(undefined);
    await expect(
      service.createCustomQuestion(customQuestionRequest, memberFixture),
    ).rejects.toThrow(ContentEmptyException);
  });

  it('카테고리 조회를 한다.', async () => {
    const categories = ['CS', 'BE', 'FE', 'CUSTOM'];
    mockQuestionRepository.findCategories.mockReturnValue(categories);
    const result = (await service.findCategories()).sort();
    expect(result).toEqual(['BE', 'CS', 'FE', '나만의 질문']);
  });

  /*
  TODO : 카테고리별 질문 조회는 Answer까지 만든 후에, 이를 Question에 합쳐야 하는 문제가 있다. 이로 인해 Answer API생성 후, 해당 API 단위테스트시에 추가할 예정이다.
   */

  it('나만의 질문을 삭제를 실패 => 회원의 id와 Question.id로 조회하지 못할 때', async () => {
    mockQuestionRepository.findQuestionByIdAndMember_Id.mockResolvedValue(
      undefined,
    );
    await expect(service.deleteById(1, memberFixture)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('나만의 질문을 삭제한다', async () => {
    mockQuestionRepository.findQuestionByIdAndMember_Id.mockResolvedValue(
      questionFixture,
    );
    mockQuestionRepository.remove.mockResolvedValue(undefined);
    const result = await service.deleteById(1, memberFixture);
    expect(result).toEqual(undefined);
  });
});

describe('Question Service 통합 테스트', () => {
  let service: QuestionService;
  let repository: QuestionRepository;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
    repository = module.get<QuestionRepository>(QuestionRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('나만의 커스텀 질문을 저장한다.', (done) => {
    service
      .createCustomQuestion(customQuestionRequestFixture, memberFixture)
      .then(() => {
        // 비동기 작업이 완료되면 done()을 호출하여 테스트 종료
        done();
      })
      .catch((error) => {
        done.fail(error); // 에러가 발생한 경우 done.fail()을 호출하여 테스트를 실패로 표시
      });
  });

  it('저장되어 있는 모든 카테고리를 조회한다.', (done) => {
    const savePromises = multiQuestionFixture.map((question) =>
      repository.save(question),
    );

    Promise.all(savePromises)
      .then(() => service.findCategories())
      .then((categories) => {
        const expectedCategories = ['CS', 'BE', 'FE', '나만의 질문'].sort();
        categories.sort();
        expect(categories).toEqual(expectedCategories);

        // 비동기 작업이 완료되면 done()을 호출하여 테스트 종료
        done();
      })
      .catch((error) => {
        done.fail(error); // 에러가 발생한 경우 done.fail()을 호출하여 테스트를 실패로 표시
      });
  });

  it('id를 통해 질문 삭제', (done) => {
    const question = questionFixture;
    repository
      .save(question)
      .then(() => service.deleteById(question.id, memberFixture))
      .then(() => repository.findById(question.id))
      .then((question) => {
        expect(question).toBeNull();
        done();
      });
  });
});
