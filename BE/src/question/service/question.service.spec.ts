import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from './question.service';
import { QuestionRepository } from '../repository/question.repository';
import {
  createQuestionRequestFixture,
  questionFixture,
} from '../util/question.util';
import { QuestionResponse } from '../dto/questionResponse';
import { CategoryRepository } from '../../category/repository/category.repository';
import { categoryFixtureWithId } from '../../category/fixture/category.fixture';
import { CategoryNotFoundException } from '../../category/exception/category.exception';
import { createIntegrationTestModule } from '../../util/test.util';
import { QuestionModule } from '../question.module';
import { CategoryModule } from '../../category/category.module';
import { Question } from '../entity/question';
import { Category } from '../../category/entity/category';
import { INestApplication, UnauthorizedException } from '@nestjs/common';
import { Member } from '../../member/entity/member';
import { MemberModule } from '../../member/member.module';
import { MemberRepository } from '../../member/repository/member.repository';
import { memberFixture } from '../../member/fixture/member.fixture';
import {
  NeedToFindByCategoryIdException,
  QuestionNotFoundException,
} from '../exception/question.exception';
import { ManipulatedTokenNotFiltered } from '../../token/exception/token.exception';
import { Answer } from '../../answer/entity/answer';
import { AnswerModule } from '../../answer/answer.module';

describe('QuestionService', () => {
  let service: QuestionService;

  const mockQuestionRepository = {
    save: jest.fn(),
    findByCategoryId: jest.fn(),
    findById: jest.fn(),
    remove: jest.fn(),
  };

  const mockCategoryRepository = {
    findByCategoryId: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestionService, QuestionRepository, CategoryRepository],
    })
      .overrideProvider(QuestionRepository)
      .useValue(mockQuestionRepository)
      .overrideProvider(CategoryRepository)
      .useValue(mockCategoryRepository)
      .compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('질문 추가', () => {
    it('질문 추가시, categoryId와 content가 있다면 성공적으로 질문을 추가한다.', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );
      mockQuestionRepository.save.mockResolvedValue(questionFixture);

      //then
      await expect(
        service.createQuestion(createQuestionRequestFixture, memberFixture),
      ).resolves.toEqual(QuestionResponse.from(questionFixture));
    });

    it('질문 추가시, categoryId가 null이거나, 존재하지 않으면 CategoryNotFoundException을 반환한다.', async () => {
      //given

      //when
      mockCategoryRepository.findByCategoryId.mockResolvedValue(undefined);

      //then
      await expect(
        service.createQuestion(createQuestionRequestFixture, memberFixture),
      ).rejects.toThrow(new CategoryNotFoundException());
    });
  });

  describe('카테고리별 질문 조회', () => {
    it('카테고리 id로 질문들을 조회하면, 해당 카테고리 내부 질문들이 반환된다.', async () => {
      //given

      //when
      mockQuestionRepository.findByCategoryId.mockResolvedValue([
        questionFixture,
      ]);

      //then
      await expect(service.findAllByCategory(1)).resolves.toEqual([
        QuestionResponse.from(questionFixture),
      ]);
    });

    it('카테고리 id가 isEmpty이면 NeedToFindByCategoryIdException을 발생시킨다..', async () => {
      //given

      //when

      //then
      await expect(service.findAllByCategory(null)).rejects.toThrow(
        new NeedToFindByCategoryIdException(),
      );
    });
  });

  describe('질문 삭제', () => {
    it('Member객체와 questionId를 입력했을 때 정상적으로 질문을 삭제한다.', async () => {
      //given

      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );

      //then
      await expect(
        service.deleteQuestionById(questionFixture.id, memberFixture),
      ).resolves.toBeUndefined();
    });

    it('Member객체가 없으면 ManipulatedTokenException을 발생시킨다.', async () => {
      //given
      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );

      //then
      await expect(
        service.deleteQuestionById(questionFixture.id, null),
      ).rejects.toThrow(new ManipulatedTokenNotFiltered());
    });

    it('questionId로 질문이 조회되지 않으면 QuestionNotFoundException을 발생시킨다.', async () => {
      //given
      //when
      mockQuestionRepository.findById.mockResolvedValue(null);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );

      //then
      await expect(
        service.deleteQuestionById(questionFixture.id, memberFixture),
      ).rejects.toThrow(new QuestionNotFoundException());
    });

    it('question의 카테고리를 조회했을 때 카테고리가 존재하지 않는다면 CategoryNotFoundException을 발생시킨다.', async () => {
      //given
      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockCategoryRepository.findByCategoryId.mockResolvedValue(undefined);

      //then
      await expect(
        service.deleteQuestionById(questionFixture.id, memberFixture),
      ).rejects.toThrow(new CategoryNotFoundException());
    });

    it('question의 카테고리를 조회했을 때 카테고리가 Member의 카테고리가 아니라면 권한 없음을 발생시킨다.', async () => {
      //given
      //when
      mockQuestionRepository.findById.mockResolvedValue(questionFixture);
      mockQuestionRepository.remove.mockResolvedValue(undefined);
      mockCategoryRepository.findByCategoryId.mockResolvedValue(
        categoryFixtureWithId,
      );

      //then
      await expect(
        service.deleteQuestionById(
          questionFixture.id,
          new Member(
            123,
            'janghee@janghee.com',
            'janghee',
            'https://www.google.co.kr',
            new Date(),
          ),
        ),
      ).rejects.toThrow(new UnauthorizedException());
    });
  });
});

describe('QuestionService 통합 테스트', () => {
  let app: INestApplication;
  let questionService: QuestionService;
  let categoryRepository: CategoryRepository;
  let questionRepository: QuestionRepository;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const modules = [
      QuestionModule,
      CategoryModule,
      MemberModule,
      AnswerModule,
    ];
    const entities = [Question, Category, Member, Answer];

    const moduleFixture = await createIntegrationTestModule(modules, entities);
    app = moduleFixture.createNestApplication();
    await app.init();

    questionService = moduleFixture.get<QuestionService>(QuestionService);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  beforeEach(async () => {
    await categoryRepository.query('delete from Question');
    await categoryRepository.query('delete from Category');
    await categoryRepository.query('delete from Member');
  });

  it('새로운 질문을 저장할 때 QuestionResponse객체를 반환한다.', async () => {
    //given
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);

    //when

    //then
    await expect(
      questionService.createQuestion(
        createQuestionRequestFixture,
        memberFixture,
      ),
    ).resolves.toEqual(QuestionResponse.from(questionFixture));
  });

  it('카테고리의 질문을 조회하면 QuestionResponse의 배열로 반환된다.', async () => {
    //given
    const member = await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    const response = await questionService.createQuestion(
      createQuestionRequestFixture,
      memberFixture,
    );

    //when

    const category = await categoryRepository.findByNameAndMember(
      categoryFixtureWithId.name,
      member.id,
    );

    //then
    await expect(
      questionService.findAllByCategory(category.id),
    ).resolves.toEqual([response]);
  });

  it('id로 질문을 삭제하면 undefined를 반환한다.', async () => {
    //given
    const member = await memberRepository.save(memberFixture);
    const category = await categoryRepository.save(categoryFixtureWithId);
    const question = await questionRepository.save(
      Question.of(category, null, 'tester'),
    );
    //when

    //then
    await expect(
      questionService.deleteQuestionById(question.id, member),
    ).resolves.toBeUndefined();
  });
});
