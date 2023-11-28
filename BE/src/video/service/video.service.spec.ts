import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { VideoRepository } from '../repository/video.repository';
import {
  memberFixture,
  otherMemberFixture,
} from 'src/member/fixture/member.fixture';
import { QuestionRepository } from 'src/question/repository/question.repository';
import { MemberRepository } from 'src/member/repository/member.repository';
import {
  videoOfWithdrawnMemberFixture,
  createPreSignedUrlRequestFixture,
  createVideoRequestFixture,
  privateVideoFixture,
  videoFixture,
  videoListFixture,
  videoOfOtherFixture,
} from '../fixture/video.fixture';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';
import { S3 } from 'aws-sdk';
import {
  IDriveException,
  Md5HashException,
  RedisDeleteException,
  RedisRetrieveException,
  VideoAccessForbiddenException,
  VideoNotFoundException,
  VideoOfWithdrawnMemberException,
} from '../exception/video.exception';
import { VideoDetailResponse } from '../dto/videoDetailResponse';
import * as crypto from 'crypto';
import { SingleVideoResponse } from '../dto/singleVideoResponse';
import {
  deleteFromRedis,
  getValueFromRedis,
  saveToRedis,
} from 'src/util/redis.util';
import { MemberNotFoundException } from 'src/member/exception/member.exception';
import { VideoHashResponse } from '../dto/videoHashResponse';
import { VideoModule } from '../video.module';
import { Video } from '../entity/video';
import { Member } from 'src/member/entity/member';
import { Question } from 'src/question/entity/question';
import { Workbook } from 'src/workbook/entity/workbook';
import { Token } from 'src/token/entity/token';
import { Category } from 'src/category/entity/category';
import { addAppModules, createIntegrationTestModule } from 'src/util/test.util';
import { INestApplication } from '@nestjs/common';
import { Answer } from 'src/answer/entity/answer';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { WorkbookRepository } from 'src/workbook/repository/workbook.repository';
import { categoryFixtureWithId } from 'src/category/fixture/category.fixture';
import { workbookFixtureWithId } from 'src/workbook/fixture/workbook.fixture';
import { questionFixture } from 'src/question/fixture/question.fixture';
import { QuestionModule } from 'src/question/question.module';
jest.mock('src/util/redis.util');

describe('VideoService 단위 테스트', () => {
  let videoService: VideoService;

  const mockVideoRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findByUrl: jest.fn(),
    findAllVideosByMemberId: jest.fn(),
    toggleVideoStatus: jest.fn(),
    remove: jest.fn(),
  };

  const mockMemberRepository = {
    findById: jest.fn(),
  };

  const mockQuestionRepository = {
    findById: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideoService,
        VideoRepository,
        MemberRepository,
        QuestionRepository,
      ],
    })
      .overrideProvider(VideoRepository)
      .useValue(mockVideoRepository)
      .overrideProvider(MemberRepository)
      .useValue(mockMemberRepository)
      .overrideProvider(QuestionRepository)
      .useValue(mockQuestionRepository)
      .compile();

    videoService = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(videoService).toBeDefined();
  });

  describe('createVideo', () => {
    const request = createVideoRequestFixture;

    it('비디오 저장 성공시 undefined로 반환된다.', () => {
      // given
      const member = memberFixture;

      // when
      mockVideoRepository.save.mockResolvedValue(undefined);

      // then
      expect(
        videoService.createVideo(member, request),
      ).resolves.toBeUndefined();
    });

    it('비디오 저장 시 member가 없으면 ManipulatedTokenNotFiltered를 반환한다.', () => {
      // given
      const member = undefined;

      // when

      // then
      expect(videoService.createVideo(member, request)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });
  });

  describe('getPreSignedUrl', () => {
    const request = createPreSignedUrlRequestFixture;

    it('preSigned URL 얻기 성공 시 PreSignedUrlResponse 형식으로 반환된다.', async () => {
      // given
      const member = memberFixture;
      const content = 'mockContent';
      (videoService as any).getQuestionContent = jest
        .fn()
        .mockResolvedValue(content);

      // when
      const response = await videoService.getPreSignedUrl(member, request);

      // then
      expect(response).toBeInstanceOf(PreSignedUrlResponse);
      expect(response.key.includes(member.nickname)).toBeTruthy(); // 파일명엔 반드시 회원의 닉네임이 포함되어 있어야 함
      expect(response.key.includes(content)).toBeTruthy(); // 파일명엔 반드시 문제의 제목이 포함되어 있어야 함
      expect(response.key.endsWith('.webm')).toBeTruthy(); // 파일 확장자는 반드시 webm이어야 함
      expect(response.preSignedUrl.startsWith('https://videos')).toBeTruthy(); // 실제 Pre-Signed Url 구조를 따라가는지 확인하기 위함
      (videoService as any).getQuestionContent.mockRestore();
    });

    it('prSigned URL 얻기 성공 시 member가 없으면 ManipulatedTokenNotFiltered을 반환한다.', () => {
      // given
      const member = undefined;

      // when

      // then
      expect(videoService.getPreSignedUrl(member, request)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });

    it('preSigned URL 얻기 시 IDrive Client가 Pre-Signed URL 발급에 실패하면 IDriveException을 반환한다.', async () => {
      // given
      const member = memberFixture;

      // when
      const getSignedUrlMock = jest.fn();
      (S3.prototype.getSignedUrlPromise as jest.Mock) = getSignedUrlMock;
      getSignedUrlMock.mockRejectedValue(new IDriveException());

      // then
      await expect(
        videoService.getPreSignedUrl(member, request),
      ).rejects.toThrow(IDriveException);

      getSignedUrlMock.mockRestore();
    });
  });

  describe('getVideoDetail', () => {
    const member = memberFixture;
    const videoId = 1;

    it('비디오 상세 정보 조회 성공 시 VideoDetailResponse 형식으로 반환된다.', async () => {
      // given
      const video = videoFixture;

      // when
      mockVideoRepository.findById.mockResolvedValue(video);
      const response = await videoService.getVideoDetail(videoId, member);

      // then
      expect(response).toBeInstanceOf(VideoDetailResponse);
      expect(response.id).toBe(video.getId());
      expect(response.nickname).toBe(member.nickname);
      expect(response.url).toBe(video.url);
      expect(response.hash).toBe(
        crypto.createHash('md5').update(video.url).digest('hex'),
      );
      expect(response.videoName).toBe(video.name);
    });

    it('비디오 상세 정보 조회 성공 시 비디오가 private이면 해시값으로 null을 반환한다.', async () => {
      // given
      const video = privateVideoFixture;

      // when
      mockVideoRepository.findById.mockResolvedValue(video);
      const response = await videoService.getVideoDetail(videoId, member);

      // then
      expect(response).toBeInstanceOf(VideoDetailResponse);
      expect(response.id).toBe(video.getId());
      expect(response.nickname).toBe(member.nickname);
      expect(response.url).toBe(video.url);
      expect(response.hash).toBeNull();
      expect(response.videoName).toBe(video.name);
    });

    it('비디오 상세 정보 조회 시 member가 없으면 ManipulatedTokenNotFiltered을 반환한다.', () => {
      // given
      const member = undefined;

      // when

      // then
      expect(videoService.getVideoDetail(videoId, member)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });

    it('비디오 상세 정보 조회 시 이미 삭제된 비디오를 조회하려고 하면 VideoNotFoundException을 반환한다.', () => {
      // given

      // when
      mockVideoRepository.findById.mockResolvedValue(undefined);

      // then
      expect(videoService.getVideoDetail(videoId, member)).rejects.toThrow(
        VideoNotFoundException,
      );
    });

    it('비디오 상세 정보 조회 시 자신의 것이 아닌 비디오를 조회하려고 하면 VideoAccessForbiddenException을 반환한다.', () => {
      // given

      // when
      mockVideoRepository.findById.mockResolvedValue(videoOfOtherFixture);

      // then
      expect(videoService.getVideoDetail(videoId, member)).rejects.toThrow(
        VideoAccessForbiddenException,
      );
    });

    it('비디오 상태 정보 조회 시 해시값을 생성하던 중 오류가 발생하면 Md5HashException을 반환한다.', () => {
      // given
      const video = videoFixture;

      // when
      const createHashMock = jest.spyOn(crypto, 'createHash');
      createHashMock.mockImplementationOnce(() => {
        throw new Md5HashException();
      });
      mockVideoRepository.findById.mockResolvedValue(video);

      // then
      expect(videoService.getVideoDetail(video.id, member)).rejects.toThrow(
        Md5HashException,
      );
    });
  });

  describe('getVideoDetailByHash', () => {
    const hash = 'fakeHash';
    const url = 'fakeUrl';
    const member = memberFixture;

    it('해시로 비디오 상세 정보 조회 성공 시 VideoDetailResponse 형식으로 반환된다.', async () => {
      // given
      const video = videoFixture;

      // when
      const mockedGetValueFromRedis = // redis 비동기 처리가 종료되지 않아 이를 처리하기 위해 모킹
        getValueFromRedis as unknown as jest.MockedFunction<
          typeof getValueFromRedis
        >;
      mockedGetValueFromRedis.mockResolvedValue(url);

      mockVideoRepository.findByUrl.mockResolvedValue(video);
      mockMemberRepository.findById.mockResolvedValue(member);
      const response = await videoService.getVideoDetailByHash(hash);

      // then
      expect(response).toBeInstanceOf(VideoDetailResponse);
      expect(response.id).toBe(video.getId());
      expect(response.nickname).toBe(member.nickname);
      expect(response.url).toBe(video.url);
      expect(response.videoName).toBe(video.name);
      expect(response.hash).toBe(hash);
    });

    it('해시로 비디오 상세 정보 조회 시 redis에서 오류가 발생하면 RedisRetrieveException을 반환한다.', () => {
      // given

      // when
      const mockedGetValueFromRedis =
        getValueFromRedis as unknown as jest.MockedFunction<
          typeof getValueFromRedis
        >;
      mockedGetValueFromRedis.mockRejectedValue(new RedisRetrieveException());

      // then
      expect(videoService.getVideoDetailByHash(hash)).rejects.toThrow(
        RedisRetrieveException,
      );
    });

    it('해시로 비디오 상세 정보 조회 시 비디오가 공개 상태가 아니라면 VideoAccessForbiddenException을 반환한다.', () => {
      // given
      const video = privateVideoFixture;

      // when
      const mockedGetValueFromRedis =
        getValueFromRedis as unknown as jest.MockedFunction<
          typeof getValueFromRedis
        >;
      mockedGetValueFromRedis.mockResolvedValue(url);
      mockVideoRepository.findByUrl.mockResolvedValue(video);
      mockMemberRepository.findById.mockResolvedValue(member);

      // then
      expect(videoService.getVideoDetailByHash(hash)).rejects.toThrow(
        VideoAccessForbiddenException,
      );
    });

    it('해시로 비디오 상세 정보 조회 시 비디오가 삭제된 회원의 비디오라면 VideoOfWithdrawnMemberException을 반환한다.', () => {
      // given
      const video = videoOfWithdrawnMemberFixture;

      // when
      const mockedGetValueFromRedis =
        getValueFromRedis as unknown as jest.MockedFunction<
          typeof getValueFromRedis
        >;
      mockedGetValueFromRedis.mockResolvedValue(url);
      mockVideoRepository.findByUrl.mockResolvedValue(video);
      mockMemberRepository.findById.mockResolvedValue(member);

      // then
      expect(videoService.getVideoDetailByHash(hash)).rejects.toThrow(
        VideoOfWithdrawnMemberException,
      );
    });

    it('해시로 비디오 상세 정보 조회 시 비디오가 삭제된 회원의 비디오라면 MemberNotFoundException을 반환한다.', () => {
      // given
      const video = videoFixture;

      // when
      const mockedGetValueFromRedis =
        getValueFromRedis as unknown as jest.MockedFunction<
          typeof getValueFromRedis
        >;
      mockedGetValueFromRedis.mockResolvedValue(url);
      mockVideoRepository.findByUrl.mockResolvedValue(video);
      mockMemberRepository.findById.mockResolvedValue(undefined);

      // then
      expect(videoService.getVideoDetailByHash(hash)).rejects.toThrow(
        MemberNotFoundException,
      );
    });
  });

  describe('getAllVideosByMemberId', () => {
    const member = memberFixture;

    it('비디오 전체 조회 성공 시 SingleVideoResponse의 배열의 형태로 반환된다.', async () => {
      // give
      const mockVideoList = videoListFixture;

      // when
      mockVideoRepository.findAllVideosByMemberId.mockResolvedValue(
        mockVideoList,
      );

      // then
      const result = await videoService.getAllVideosByMemberId(member);

      expect(result).toHaveLength(mockVideoList.length);
      expect(result).toEqual(mockVideoList.map(SingleVideoResponse.from));
      result.forEach((element) => {
        expect(element).toBeInstanceOf(SingleVideoResponse);
      });
    });

    it('비디오 전체 조회 시 저장된 비디오가 없으면 빈 배열이 반환된다.', async () => {
      // give
      const emptyList = [];

      // when
      mockVideoRepository.findAllVideosByMemberId.mockResolvedValue(emptyList);

      // then
      const result = await videoService.getAllVideosByMemberId(member);

      expect(result).toHaveLength(0);
      expect(result).toEqual(emptyList);
    });

    it('비디오 전체 조회 시 member가 없으면 ManipulatedTokenNotFiltered을 반환한다.', () => {
      // given
      const member = undefined;

      // when

      // then
      expect(videoService.getAllVideosByMemberId(member)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });
  });

  describe('toggleVideoStatus', () => {
    const member = memberFixture;

    it('비디오 상태 토글 시 VideoHashResponse의 형태로 반환된다.', async () => {
      // give
      const video = videoFixture;

      // when
      mockVideoRepository.findById.mockResolvedValue(video);

      // then
      const result = await videoService.toggleVideoStatus(video.id, member);

      expect(result).toBeInstanceOf(VideoHashResponse);
      expect(result.hash).toBeNull(); // public 비디오를 토글했으므로, 해시는 null값이 와야함
    });

    it('비디오 상태 토글 시 비디오가 원래 private이었다면 토글 후 url의 해시값이 반환된다.', async () => {
      // give
      const video = privateVideoFixture;

      // when
      mockVideoRepository.findById.mockResolvedValue(video);

      // then
      const result = await videoService.toggleVideoStatus(video.id, member);

      expect(result).toBeInstanceOf(VideoHashResponse);
      expect(result.hash).toBe(
        crypto.createHash('md5').update(video.url).digest('hex'),
      );
      expect(result.hash).toHaveLength(32);
    });

    it('비디오 상태 토글 시 member가 없으면 ManipulatedTokenNotFiltered을 반환한다.', () => {
      // given
      const video = videoFixture;
      const member = undefined;

      // when

      // then
      expect(videoService.toggleVideoStatus(video.id, member)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });

    it('비디오 상태 토글 시 이미 삭제된 비디오의 상태를 토글하려고 하면 VideoNotFoundException을 반환한다.', () => {
      // given
      const video = videoFixture;

      // when
      mockVideoRepository.findById.mockResolvedValue(undefined);

      // then
      expect(videoService.toggleVideoStatus(video.id, member)).rejects.toThrow(
        VideoNotFoundException,
      );
    });

    it('비디오 상태 토글 시 자신의 것이 아닌 비디오의 상태를 토글하려고 하면 VideoAccessForbiddenException을 반환한다.', () => {
      // given
      const video = videoOfOtherFixture;

      // when
      mockVideoRepository.findById.mockResolvedValue(video);

      // then
      expect(videoService.toggleVideoStatus(video.id, member)).rejects.toThrow(
        VideoAccessForbiddenException,
      );
    });

    it('비디오 상태 토글 시 해시값을 생성하던 중 오류가 발생하면 Md5HashException을 반환한다.', () => {
      // given
      const video = videoFixture;

      // when
      const createHashMock = jest.spyOn(crypto, 'createHash');
      createHashMock.mockImplementationOnce(() => {
        throw new Md5HashException();
      });
      mockVideoRepository.findById.mockResolvedValue(video);

      // then
      expect(videoService.toggleVideoStatus(video.id, member)).rejects.toThrow(
        Md5HashException,
      );
    });

    it('비디오 상태 토글 시 redis에서 값을 삭제하던 중 오류가 발생하면 RedisDeleteException을 반환한다.', () => {
      // given
      const video = videoFixture;

      // when
      const mockedGetValueFromRedis =
        deleteFromRedis as unknown as jest.MockedFunction<
          typeof deleteFromRedis
        >;
      mockedGetValueFromRedis.mockRejectedValue(new RedisDeleteException());
      mockVideoRepository.findById.mockResolvedValue(video);

      // then
      expect(videoService.toggleVideoStatus(video.id, member)).rejects.toThrow(
        RedisDeleteException,
      );
    });

    it('비디오 상태 토글 시 redis에서 값을 얻어오던 중 오류가 발생하면 RedisRetrieveException을 반환한다.', () => {
      // given
      const video = privateVideoFixture;

      // when
      const mockedGetValueFromRedis =
        saveToRedis as unknown as jest.MockedFunction<typeof saveToRedis>;
      mockedGetValueFromRedis.mockRejectedValue(new RedisRetrieveException());
      mockVideoRepository.findById.mockResolvedValue(video);

      // then
      expect(videoService.toggleVideoStatus(video.id, member)).rejects.toThrow(
        RedisRetrieveException,
      );
    });
  });

  describe('deleteVideo', () => {
    const member = memberFixture;

    it('비디오 삭제 성공 시 undefined로 반환된다.', () => {
      // given
      const video = videoFixture;

      // when
      mockVideoRepository.remove.mockResolvedValue(undefined);

      // then
      expect(
        videoService.deleteVideo(video.id, member),
      ).resolves.toBeUndefined();
    });

    it('비디오 삭제 시 member가 없으면 ManipulatedTokenNotFiltered을 반환한다.', () => {
      // given
      const video = videoFixture;
      const member = undefined;

      // when

      // then
      expect(videoService.deleteVideo(video.id, member)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });

    it('비디오 삭제 시 이미 삭제된 비디오를 삭제하려고 하면 VideoNotFoundException을 반환한다.', () => {
      // given
      const video = videoFixture;

      // when
      mockVideoRepository.findById.mockResolvedValue(undefined);

      // then
      expect(videoService.deleteVideo(video.id, member)).rejects.toThrow(
        VideoNotFoundException,
      );
    });

    it('비디오 삭제 시 자신의 것이 아닌 비디오를 삭제하려고 하면 VideoAccessForbiddenException을 반환한다.', () => {
      // given
      const video = videoOfOtherFixture;

      // when
      mockVideoRepository.findById.mockResolvedValue(video);

      // then
      expect(videoService.deleteVideo(video.id, member)).rejects.toThrow(
        VideoAccessForbiddenException,
      );
    });
  });
});

describe('VideoService 통합 테스트', () => {
  let app: INestApplication;
  let videoService: VideoService;
  let categoryRepository: CategoryRepository;
  let memberRepository: MemberRepository;
  let questionRepository: QuestionRepository;
  let workbookRepository: WorkbookRepository;
  let videoRepository: VideoRepository;

  beforeAll(async () => {
    const modules = [VideoModule, QuestionModule];
    const entities = [
      Video,
      Member,
      Question,
      Answer,
      Workbook,
      Token,
      Category,
    ];

    const moduleFixture: TestingModule = await createIntegrationTestModule(
      modules,
      entities,
    );

    app = moduleFixture.createNestApplication();
    addAppModules(app);
    await app.init();

    videoService = moduleFixture.get<VideoService>(VideoService);
    categoryRepository =
      moduleFixture.get<CategoryRepository>(CategoryRepository);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
    questionRepository =
      moduleFixture.get<QuestionRepository>(QuestionRepository);
    workbookRepository =
      moduleFixture.get<WorkbookRepository>(WorkbookRepository);
    videoRepository = moduleFixture.get<VideoRepository>(VideoRepository);
  });

  beforeEach(async () => {
    await memberRepository.save(memberFixture);
    await categoryRepository.save(categoryFixtureWithId);
    await workbookRepository.save(workbookFixtureWithId);
    await questionRepository.save(questionFixture);
  });

  describe('createVideo', () => {
    it('새로운 비디오 저장에 성공하면 undefined를 반환한다.', async () => {
      //given
      const member = memberFixture;

      //when

      //then
      await expect(
        videoService.createVideo(member, createVideoRequestFixture),
      ).resolves.toBeUndefined();
    });

    it('새로운 비디오 저장 시 member가 없으면 ManipulatedTokenNotFiltered를 반환한다.', async () => {
      //given
      const member = null;

      //when

      //then
      expect(
        videoService.createVideo(member, createVideoRequestFixture),
      ).rejects.toThrow(ManipulatedTokenNotFiltered);
    });
  });

  describe('getPreSignedUrl', () => {
    it('preSigned URL 얻기 성공 시 PreSignedUrlResponse 형식으로 반환된다.', async () => {
      //given
      const member = memberFixture;

      //when
      const result = await videoService.getPreSignedUrl(
        member,
        createPreSignedUrlRequestFixture,
      );

      //then
      expect(result).toBeInstanceOf(PreSignedUrlResponse);
    });

    it('새로운 비디오 저장 시 member가 없으면 ManipulatedTokenNotFiltered를 반환한다.', async () => {
      //given
      const memberFixture = null;

      //when

      //then
      expect(
        videoService.getPreSignedUrl(
          memberFixture,
          createPreSignedUrlRequestFixture,
        ),
      ).rejects.toThrow(ManipulatedTokenNotFiltered);
    });
  });

  describe('getVideoDetail', () => {
    it('비디오 세부 정보 조회 성공 시 VideoDetailResponse 형식으로 반환된다.', async () => {
      //given
      const member = memberFixture;
      const video = await videoRepository.save(videoFixture);

      //when
      const result = await videoService.getVideoDetail(video.id, member);

      //then
      expect(result).toBeInstanceOf(VideoDetailResponse);
      expect(result.nickname).toBe(member.nickname);
      expect(result.url).toBe(video.url);
      expect(result.videoName).toBe(video.name);
      expect(result.hash).toBe(
        crypto.createHash('md5').update(video.url).digest('hex'),
      );
    });

    it('비디오 세부 정보 조회 성공 시 비디오가 private이라면 hash로 null을 반환한다.', async () => {
      //given
      const member = memberFixture;
      const video = await videoRepository.save(privateVideoFixture);

      //when
      const result = await videoService.getVideoDetail(video.id, member);

      //then
      expect(result).toBeInstanceOf(VideoDetailResponse);
      expect(result.nickname).toBe(member.nickname);
      expect(result.url).toBe(video.url);
      expect(result.videoName).toBe(video.name);
      expect(result.hash).toBeNull();
    });

    it('비디오 세부 정보 조회 시 member가 없으면 ManipulatedTokenNotFiltered를 반환한다.', async () => {
      //given
      const member = null;
      const video = await videoRepository.save(videoFixture);

      //when

      //then
      expect(videoService.getVideoDetail(video.id, member)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });

    it('비디오 세부 정보 조회 시 존재하지 않는 비디오를 조회하려 하면 VideoNotFoundException을 반환한다.', async () => {
      //given
      const member = memberFixture;
      const video = await videoRepository.save(videoFixture);

      //when

      //then
      expect(
        videoService.getVideoDetail(video.id + 1000, member),
      ).rejects.toThrow(VideoNotFoundException);
    });

    it('비디오 세부 정보 조회 시 다른 사람의 비디오를 조회하려 하면 VideoAccessForbiddenException을 반환한다.', async () => {
      //given
      const member = memberFixture;
      await memberRepository.save(otherMemberFixture);
      const video = await videoRepository.save(videoOfOtherFixture);

      //when

      //then
      expect(videoService.getVideoDetail(video.id, member)).rejects.toThrow(
        VideoAccessForbiddenException,
      );
    });
  });

  afterEach(async () => {
    await questionRepository.query('delete from Member');
    await questionRepository.query('delete from Category');
    await questionRepository.query('delete from Workbook');
    await questionRepository.query('delete from Question');
    await questionRepository.query('delete from Video');
    await questionRepository.query('DELETE FROM sqlite_sequence'); // Auto Increment 초기화
  });
});
