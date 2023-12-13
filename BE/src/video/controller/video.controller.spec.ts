import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from '../service/video.service';
import {
  memberFixture,
  mockReqWithMemberFixture,
  oauthRequestFixture,
  otherMemberFixture,
} from 'src/member/fixture/member.fixture';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';
import { Request, Response } from 'express';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';
import {
  IDriveException,
  InvalidHashException,
  Md5HashException,
  RedisDeleteException,
  RedisRetrieveException,
  RedisSaveException,
  VideoAccessForbiddenException,
  VideoNotFoundException,
  VideoNotFoundWithHashException,
  VideoOfWithdrawnMemberException,
} from '../exception/video.exception';
import {
  createVideoRequestFixture,
  privateVideoFixture,
  videoFixture,
  videoListFixture,
  videoOfOtherFixture,
  videoOfWithdrawnMemberFixture,
} from '../fixture/video.fixture';
import { VideoDetailResponse } from '../dto/videoDetailResponse';
import { VideoHashResponse } from '../dto/videoHashResponse';
import { SingleVideoResponse } from '../dto/singleVideoResponse';
import { MemberNotFoundException } from 'src/member/exception/member.exception';
import { INestApplication } from '@nestjs/common';
import { VideoModule } from '../video.module';
import { addAppModules, createIntegrationTestModule } from 'src/util/test.util';
import { AuthService } from 'src/auth/service/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import * as request from 'supertest';
import { QuestionRepository } from 'src/question/repository/question.repository';
import { questionFixture } from 'src/question/fixture/question.fixture';
import { workbookFixtureWithId } from 'src/workbook/fixture/workbook.fixture';
import { WorkbookRepository } from 'src/workbook/repository/workbook.repository';
import 'dotenv/config';
import { VideoRepository } from '../repository/video.repository';
import * as crypto from 'crypto';
import { MemberRepository } from 'src/member/repository/member.repository';
import { CategoryRepository } from 'src/category/repository/category.repository';
import { categoryFixtureWithId } from 'src/category/fixture/category.fixture';
import { clearRedis, saveToRedis } from 'src/util/redis.util';
import redisMock from 'ioredis-mock';

describe('VideoController 단위 테스트', () => {
  let controller: VideoController;

  const mockVideoService = {
    createVideo: jest.fn(),
    getPreSignedUrl: jest.fn(),
    getAllVideosByMemberId: jest.fn(),
    getVideoDetail: jest.fn(),
    getVideoDetailByHash: jest.fn(),
    toggleVideoStatus: jest.fn(),
    deleteVideo: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideoController],
      providers: [VideoService],
    })
      .overrideProvider(VideoService)
      .useValue(mockVideoService)
      .compile();

    controller = module.get<VideoController>(VideoController);
  });

  it('videoController should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createVideo', () => {
    const createVideoRequest = createVideoRequestFixture;

    it('비디오 저장 성공 시 undefined를 반환한다.', async () => {
      //given

      //when
      mockVideoService.createVideo.mockResolvedValue(undefined);

      //then
      expect(
        controller.createVideo(mockReqWithMemberFixture, createVideoRequest),
      ).resolves.toBeUndefined();
    });

    it('비디오 저장시 회원 객체가 없으면 ManipulatedTokenNotFilteredException을 반환한다.', async () => {
      //given
      const member = { user: null } as unknown as Request;

      //when
      mockVideoService.createVideo.mockRejectedValue(
        new ManipulatedTokenNotFiltered(),
      );

      //then
      expect(
        controller.createVideo(member, createVideoRequest),
      ).rejects.toThrow(ManipulatedTokenNotFiltered);
    });
  });

  describe('getPreSignedUrl', () => {
    it('Pre-Signed URL 발급 완료 시 PreSignedUrlResponse 객체 형태로 응답된다.', async () => {
      //given

      //when
      mockVideoService.getPreSignedUrl.mockResolvedValue(
        new PreSignedUrlResponse('fakePreSignedUrl', 'fakeKey'),
      );

      //then
      const result = await controller.getPreSignedUrl(mockReqWithMemberFixture);

      expect(result).toBeInstanceOf(PreSignedUrlResponse);
      expect(result.preSignedUrl).toBe('fakePreSignedUrl');
      expect(result.key).toBe('fakeKey');
    });

    it('Pre-Signed URL 생성 도중 에러가 발생하면 IDriveException을 반환해야한다.', async () => {
      //given

      // when
      mockVideoService.getPreSignedUrl.mockRejectedValue(new IDriveException());

      // then
      expect(
        controller.getPreSignedUrl(mockReqWithMemberFixture),
      ).rejects.toThrow(IDriveException);
    });

    it('Pre-Signed URL 생성 시 회원 객체가 없으면 ManipulatedTokenNotFilteredException을 반환한다.', async () => {
      // given
      const member = { user: null } as unknown as Request;

      // when
      mockVideoService.getPreSignedUrl.mockRejectedValue(
        new ManipulatedTokenNotFiltered(),
      );

      // then
      expect(controller.getPreSignedUrl(member)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });
  });

  describe('getAllVideo', () => {
    it('비디오 전체 조회 성공 시 VideoListResponse 객체 형태로 응답된다.', async () => {
      //given
      const videoList = videoListFixture;

      //when
      const mockVideoListResponse = videoList.map(SingleVideoResponse.from);
      mockVideoService.getAllVideosByMemberId.mockResolvedValue(
        mockVideoListResponse,
      );

      //then
      const result = await controller.getAllVideo(mockReqWithMemberFixture);

      expect(result).toBeInstanceOf(Array);
      expect(result).toBe(mockVideoListResponse);
    });

    it('비디오 전체 조회 시 회원이 저장한 비디오가 없으면 빈 배열을 반환한다.', async () => {
      //given
      const mockVideoListResponse = [];

      //when
      mockVideoService.getAllVideosByMemberId.mockResolvedValue(
        mockVideoListResponse,
      );

      //then
      const result = await controller.getAllVideo(mockReqWithMemberFixture);

      expect(result).toBeInstanceOf(Array);
      expect(result).toStrictEqual(mockVideoListResponse);
    });

    it('비디오 전체 조회 시 회원 객체가 없으면 ManipulatedTokenNotFilteredException을 반환한다.', async () => {
      // given
      const member = { user: null } as unknown as Request;

      // when
      mockVideoService.getAllVideosByMemberId.mockRejectedValue(
        new ManipulatedTokenNotFiltered(),
      );

      // then
      expect(controller.getAllVideo(member)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });
  });

  describe('getVideoDetailByHash', () => {
    const hash = 'fakeHash';
    const nickname = 'fakeNickname';

    it('해시로 비디오 조회 성공 시 VideoDetailResponse 객체 형태로 응답된다.', async () => {
      // given
      const video = videoFixture;

      // when
      const mockVideoDetailWithHash = VideoDetailResponse.from(
        video,
        nickname,
        hash,
      );
      mockVideoService.getVideoDetailByHash.mockResolvedValue(
        mockVideoDetailWithHash,
      );

      // then
      const result = await controller.getVideoDetailByHash(hash);

      expect(result).toBeInstanceOf(VideoDetailResponse);
      expect(result).toBe(mockVideoDetailWithHash);
    });

    it('해시로 비디오 조회 시 해시의 길이가 32자가 아니라면 InvalidHashException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetailByHash.mockRejectedValue(
        new InvalidHashException(),
      );

      // then
      expect(controller.getVideoDetailByHash(hash)).rejects.toThrow(
        InvalidHashException,
      );
    });

    it('해시로 비디오 조회 시 비디오가 private이라면 VideoAccessForbiddenException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetailByHash.mockRejectedValue(
        new VideoAccessForbiddenException(),
      );

      // then
      expect(controller.getVideoDetailByHash(hash)).rejects.toThrow(
        VideoAccessForbiddenException,
      );
    });

    it('해시로 비디오 조회 시 Redis에 저장된 URL로 DB에서 조회되는 비디오가 없다면 VideoNotFoundException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetailByHash.mockRejectedValue(
        new VideoNotFoundException(),
      );

      // then
      expect(controller.getVideoDetailByHash(hash)).rejects.toThrow(
        VideoNotFoundException,
      );
    });

    it('해시로 비디오 조회 시 탈퇴한 회원의 비디오라면 VideoOfWithdrawnMemberException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetailByHash.mockRejectedValue(
        new VideoOfWithdrawnMemberException(),
      );

      // then
      expect(controller.getVideoDetailByHash(hash)).rejects.toThrow(
        VideoOfWithdrawnMemberException,
      );
    });

    it('해시로 비디오 조회 시 유효한 해시지만 조회되는 비디오가 없다면 VideoNotFoundWithHashException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetailByHash.mockRejectedValue(
        new VideoNotFoundWithHashException(),
      );

      // then
      expect(controller.getVideoDetailByHash(hash)).rejects.toThrow(
        VideoNotFoundWithHashException,
      );
    });

    it('해시로 비디오 조회 시 비디오의 소유자를 찾을 수 없다면 MemberNotFoundException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetailByHash.mockRejectedValue(
        new MemberNotFoundException(),
      );

      // then
      expect(controller.getVideoDetailByHash(hash)).rejects.toThrow(
        MemberNotFoundException,
      );
    });

    it('해시로 비디오 조회 시 Redis에서 비디오의 URL을 얻어내는 중 에러가 발생하면 RedisRetrieveException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetailByHash.mockRejectedValue(
        new RedisRetrieveException(),
      );

      // then
      expect(controller.getVideoDetailByHash(hash)).rejects.toThrow(
        RedisRetrieveException,
      );
    });
  });

  describe('getVideoDetail', () => {
    const mockReq = mockReqWithMemberFixture;
    const nickname = memberFixture.nickname;
    const hash = 'fakeHash';
    const video = videoFixture;

    it('비디오 상세 정보 조회 성공 시 VideoDetailResponse 객체 형태로 응답된다.', async () => {
      // given

      // when
      const mockVideoDetailWithHash = VideoDetailResponse.from(
        video,
        nickname,
        hash,
      );
      mockVideoService.getVideoDetail.mockResolvedValue(
        mockVideoDetailWithHash,
      );

      // then
      const result = await controller.getVideoDetail(1, mockReq);

      expect(result).toBeInstanceOf(VideoDetailResponse);
      expect(result).toBe(mockVideoDetailWithHash);
    });

    it('비디오 상세 정보 조회 성공 시 비디오가 private이라면 VideoDetailResponse의 hash는 null로 설정되어 반환한다.', async () => {
      // given

      // when
      const mockVideoDetailWithHash = VideoDetailResponse.from(
        video,
        nickname,
        null,
      );
      mockVideoService.getVideoDetail.mockResolvedValue(
        mockVideoDetailWithHash,
      );

      // then
      const result = await controller.getVideoDetail(1, mockReq);

      expect(result).toBeInstanceOf(VideoDetailResponse);
      expect(result).toBe(mockVideoDetailWithHash);
      expect(result.hash).toBeNull();
    });

    it('비디오 상세 정보 조회 시 회원 객체가 없으면 ManipulatedTokenNotFilteredException을 반환한다.', async () => {
      // given
      const member = { user: null } as unknown as Request;

      // when
      mockVideoService.getVideoDetail.mockRejectedValue(
        new ManipulatedTokenNotFiltered(),
      );

      // then
      expect(controller.getVideoDetail(1, member)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });

    it('비디오 상세 정보 조회 시 해당 비디오가 삭제되었다면 VideoNotFoundException를 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetail.mockRejectedValue(
        new VideoNotFoundException(),
      );

      // then
      expect(controller.getVideoDetail(1, mockReq)).rejects.toThrow(
        VideoNotFoundException,
      );
    });

    it('비디오 상세 정보 조회 시 다른 회원의 비디오를 조회하려 한다면 VideoAccessForbiddenException를 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetail.mockRejectedValue(
        new VideoAccessForbiddenException(),
      );

      // then
      expect(controller.getVideoDetail(1, mockReq)).rejects.toThrow(
        VideoAccessForbiddenException,
      );
    });

    it('비디오 상세 정보 조회 시 해시 생성에 실패한다면 Md5HashException를 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetail.mockRejectedValue(new Md5HashException());

      // then
      expect(controller.getVideoDetail(1, mockReq)).rejects.toThrow(
        Md5HashException,
      );
    });
  });

  describe('toggleVideoStatus', () => {
    const member = mockReqWithMemberFixture;

    it('비디오 상태 토글 성공 시 VideoHashResponse 객체 형태로 응답된다.', async () => {
      // given
      const hash = 'fakeHash';
      const mockVideoHashResponse = new VideoHashResponse(hash);

      // when
      mockVideoService.toggleVideoStatus.mockResolvedValue(
        mockVideoHashResponse,
      );

      // then
      const result = await controller.toggleVideoStatus(1, member);

      expect(result).toBeInstanceOf(VideoHashResponse);
      expect(result).toBe(mockVideoHashResponse);
    });

    it('비디오 상태 토글 성공 시 비디오의 상태가 private라면 VideoHashResponse의 hash는 null로 설정되어 반환한다.', async () => {
      // given
      const mockVideoHashResponse = new VideoHashResponse(null);

      // when
      mockVideoService.toggleVideoStatus.mockResolvedValue(
        mockVideoHashResponse,
      );

      // then
      const result = await controller.toggleVideoStatus(1, member);

      expect(result).toBeInstanceOf(VideoHashResponse);
      expect(result).toBe(mockVideoHashResponse);
      expect(result.hash).toBeNull();
    });

    it('비디오 상태 토글 시 회원 객체가 없으면 ManipulatedTokenNotFilteredException을 반환한다.', async () => {
      // given
      const nullMember = { user: null } as unknown as Request;

      // when
      mockVideoService.toggleVideoStatus.mockRejectedValue(
        new ManipulatedTokenNotFiltered(),
      );

      // then
      expect(controller.toggleVideoStatus(1, nullMember)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });

    it('비디오 상태 토글 시 해당 비디오가 삭제되었다면 VideoNotFoundException를 반환한다.', async () => {
      // given

      // when
      mockVideoService.toggleVideoStatus.mockRejectedValue(
        new VideoNotFoundException(),
      );

      // then
      expect(controller.toggleVideoStatus(1, member)).rejects.toThrow(
        VideoNotFoundException,
      );
    });

    it('비디오 상태 토글 시 다른 회원의 비디오를 토글하려 한다면 VideoAccessForbiddenException를 반환한다.', async () => {
      // given

      // when
      mockVideoService.toggleVideoStatus.mockRejectedValue(
        new VideoAccessForbiddenException(),
      );

      // then
      expect(controller.toggleVideoStatus(1, member)).rejects.toThrow(
        VideoAccessForbiddenException,
      );
    });

    it('비디오 상태 토글 시 url 해싱에 실패한다면 Md5HashException를 반환한다.', async () => {
      // given

      // when
      mockVideoService.toggleVideoStatus.mockRejectedValue(
        new Md5HashException(),
      );

      // then
      expect(controller.toggleVideoStatus(1, member)).rejects.toThrow(
        Md5HashException,
      );
    });

    it('비디오 상태 토글 시 Redis에 데이터 저장 중 에러가 발생한다면 RedisSaveException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.toggleVideoStatus.mockRejectedValue(
        new RedisSaveException(),
      );

      // then
      expect(controller.toggleVideoStatus(1, member)).rejects.toThrow(
        RedisSaveException,
      );
    });

    it('비디오 상태 토글 시 Redis에서 데이터 삭제 도중 에러가 발생한다면 RedisDeleteException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.toggleVideoStatus.mockRejectedValue(
        new RedisDeleteException(),
      );

      // then
      expect(controller.toggleVideoStatus(1, member)).rejects.toThrow(
        RedisDeleteException,
      );
    });
  });

  describe('deleteVideo', () => {
    const member = mockReqWithMemberFixture;
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as unknown as Response;

    it('비디오 삭제 성공 시 undefined를 반환한다.', async () => {
      //given

      //when
      mockVideoService.deleteVideo.mockResolvedValue(undefined);

      //then
      expect(
        controller.deleteVideo(1, member, response),
      ).resolves.toBeUndefined();
    });

    it('비디오 삭제 시 회원 객체가 없으면 ManipulatedTokenNotFilteredException을 반환한다.', async () => {
      //given
      const nullMember = { user: null } as unknown as Request;

      //when
      mockVideoService.deleteVideo.mockRejectedValue(
        new ManipulatedTokenNotFiltered(),
      );

      //then
      expect(controller.deleteVideo(1, nullMember, response)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });

    it('비디오 삭제 시 해당 비디오가 이미 삭제되었다면 VideoNotFoundException를 반환한다.', async () => {
      // given

      // when
      mockVideoService.deleteVideo.mockRejectedValue(
        new VideoNotFoundException(),
      );

      // then
      expect(controller.deleteVideo(1, member, response)).rejects.toThrow(
        VideoNotFoundException,
      );
    });

    it('비디오 삭제 시 다른 회원의 비디오를 조회하려 한다면 VideoAccessForbiddenException를 반환한다.', async () => {
      // given

      // when
      mockVideoService.deleteVideo.mockRejectedValue(
        new VideoAccessForbiddenException(),
      );

      // then
      expect(controller.deleteVideo(1, member, response)).rejects.toThrow(
        VideoAccessForbiddenException,
      );
    });
  });
});

describe('VideoController 통합 테스트', () => {
  let app: INestApplication;
  let authService: AuthService;
  let categoryRepository: CategoryRepository;
  let memberRepository: MemberRepository;
  let questionRepository: QuestionRepository;
  let workbookRepository: WorkbookRepository;
  let videoRepository: VideoRepository;
  let token: string;

  beforeAll(async () => {
    const modules = [VideoModule, AuthModule];

    const moduleFixture: TestingModule =
      await createIntegrationTestModule(modules);

    app = moduleFixture.createNestApplication();
    addAppModules(app);
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
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
    token = await authService.login(oauthRequestFixture);
    await categoryRepository.save(categoryFixtureWithId);
    await workbookRepository.save(workbookFixtureWithId);
    await questionRepository.save(questionFixture);
  });

  describe('createVideo', () => {
    it('쿠키를 가지고 비디오 생성을 요청하면 201 상태 코드와 undefined가 반환된다.', async () => {
      // given

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/video')
        .set('Cookie', [`accessToken=${token}`])
        .send(createVideoRequestFixture)
        .expect(201)
        .expect((res) => {
          expect(res.body).toStrictEqual({});
        });
    });

    it('쿠키 없이 비디오 생성을 요청하면 401 상태코드가 반환된다.', async () => {
      // given

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/video')
        .send(createVideoRequestFixture)
        .expect(401);
    });
  });

  describe('getPreSignedUrl', () => {
    it('쿠키를 가지고 Pre-Signed URL 생성을 요청하면 201 상태 코드가 반환된다.', async () => {
      // given

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .post('/api/video/pre-signed')
        .set('Cookie', [`accessToken=${token}`])
        .expect(201);
    });

    it('쿠키 없이 Pre-Signed URL 생성을 요청하면 401 상태 코드가 반환된다.', async () => {
      // given

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.post('/api/video/pre-signed').expect(401);
    });
  });

  describe('getAllVideo', () => {
    it('쿠키를 가지고 전체 비디오 조회를 요청하면 200 상태 코드와 현재 저장 되어 있던 비디오가 반환된다.', async () => {
      // given
      await videoRepository.save(videoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get('/api/video/all')
        .set('Cookie', [`accessToken=${token}`])
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveLength(1);
        });
    });

    it('쿠키를 가지고 전체 비디오 조회를 요청 시 저장된 비디오가 없다면 200 상태 코드와 빈 배열이 반환된다.', async () => {
      // given

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get('/api/video/all')
        .set('Cookie', [`accessToken=${token}`])
        .expect(200)
        .expect((res) => expect(res.body).toEqual([]));
    });

    it('쿠키 없이 전체 비디오 조회를 요청하면 401 상태 코드가 반환된다.', async () => {
      // given
      await authService.login(oauthRequestFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get('/api/video/all').expect(401);
    });
  });

  describe('getVideoDetailByHash', () => {
    let mockRedis;

    beforeEach(async () => {
      mockRedis = new redisMock();
    });

    it('쿠키를 가지고 해시로 비디오 조회를 요청하면 200 상태 코드와 비디오 정보가 반환된다.', async () => {
      // given
      await videoRepository.save(videoFixture);
      const hash = crypto
        .createHash('md5')
        .update(videoFixture.url)
        .digest('hex');
      await saveToRedis(hash, videoFixture.url, mockRedis);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/video/hash/${hash}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(200)
        .expect((res) =>
          expect(res.body).toMatchObject(
            VideoDetailResponse.from(
              videoFixture,
              oauthRequestFixture.name,
              hash,
            ),
          ),
        );
    });

    it('쿠키 없이 해시로 비디오 조회를 요청하더라도 200 상태 코드와 비디오 정보가 반환된다.', async () => {
      // given
      await videoRepository.save(videoFixture);
      const hash = crypto
        .createHash('md5')
        .update(videoFixture.url)
        .digest('hex');
      await saveToRedis(hash, videoFixture.url, mockRedis);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/video/hash/${hash}`)
        .expect(200)
        .expect((res) =>
          expect(res.body).toMatchObject(
            VideoDetailResponse.from(
              videoFixture,
              oauthRequestFixture.name,
              hash,
            ),
          ),
        );
    });

    it('유효하지 않은 형태의 해시로 비디오 조회를 요청하면 400 상태 코드가 반환된다.', async () => {
      // given
      await videoRepository.save(privateVideoFixture);
      const hash = 'invalidHash';

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get(`/api/video/hash/${hash}`).expect(400);
    });

    it('해시로 private인 비디오 조회를 요청하면 403 상태 코드가 반환된다.', async () => {
      // given
      const video = await videoRepository.save(privateVideoFixture);
      const hash = crypto
        .createHash('md5')
        .update(privateVideoFixture.url)
        .digest('hex');
      await saveToRedis(hash, video.url, mockRedis);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get(`/api/video/hash/${hash}`).expect(403);
    });

    it('해시로 Redis에서 조회한 비디오가 DB에서 조회되지 않는다면 404 상태 코드가 반환된다.', async () => {
      // given
      const video = await videoRepository.save(privateVideoFixture);
      const hash = crypto
        .createHash('md5')
        .update(privateVideoFixture.url)
        .digest('hex');
      await saveToRedis(hash, video.url, mockRedis);
      await videoRepository.remove(video);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get(`/api/video/hash/${hash}`).expect(404);
    });

    it('해시로 탈퇴한 회원의 비디오 조회를 요청하면 404 상태 코드가 반환된다.', async () => {
      // give
      const video = await videoRepository.save(videoOfWithdrawnMemberFixture);
      const hash = crypto
        .createHash('md5')
        .update(videoFixture.url)
        .digest('hex');
      await saveToRedis(hash, video.url, mockRedis);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get(`/api/video/hash/${hash}`).expect(404);
    });

    it('유효한 해시로 조회 시 조회되는 비디오가 없다면 404 상태 코드가 반환된다.', async () => {
      // give
      await videoRepository.save(videoOfWithdrawnMemberFixture);
      const hash = crypto
        .createHash('md5')
        .update(videoOfOtherFixture.url)
        .digest('hex');

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get(`/api/video/hash/${hash}`).expect(404);
    });

    afterEach(async () => {
      await clearRedis(mockRedis);
    });
  });

  describe('getVideoDetail', () => {
    it('쿠키를 가지고 비디오 조회를 요청하면 200 상태 코드와 비디오 정보가 반환된다.', async () => {
      // given
      const video = await videoRepository.save(videoFixture);
      const hash = crypto.createHash('md5').update(video.url).digest('hex');

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/video/${video.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(200)
        .expect((res) =>
          expect(res.body).toMatchObject(
            VideoDetailResponse.from(
              videoFixture,
              oauthRequestFixture.name,
              hash,
            ),
          ),
        );
    });

    it('private 상태인 비디오 조회를 요청하면 200 상태 코드와 hash가 null인 상태로 비디오 정보가 반환된다.', async () => {
      // given
      const video = await videoRepository.save(privateVideoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/video/${video.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(200)
        .expect((res) => {
          expect(res.body).toMatchObject(
            VideoDetailResponse.from(
              privateVideoFixture,
              oauthRequestFixture.name,
              null,
            ),
          );
        });
    });

    it('쿠키 없이 해시로 비디오 조회를 요청하면 401 상태 코드가 반환된다.', async () => {
      // given
      const video = await videoRepository.save(videoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.get(`/api/video/${video.id}`).expect(401);
    });

    it('다른 사람의 비디오 조회를 요청하면 403 상태 코드가 반환된다.', async () => {
      // give
      await memberRepository.save(otherMemberFixture);
      const video = await videoRepository.save(videoOfOtherFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/video/${video.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(403);
    });

    it('존재하지 않는 비디오 조회를 요청하면 404 상태 코드가 반환된다.', async () => {
      // give
      const video = await videoRepository.save(videoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .get(`/api/video/${video.id + 1000}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(404);
    });
  });

  describe('toggleVideoStatus', () => {
    it('쿠키를 가지고 비디오 상태 토글을 요청하면 200 상태 코드와 해시값 null이 반환된다.', async () => {
      // give
      const video = await videoRepository.save(videoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .patch(`/api/video/${video.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(200)
        .expect((res) => expect(res.body.hash).toBeNull());
    });

    it('쿠키를 가지고 private 비디오의 상태 토글을 요청하면 200 상태 코드와 url 해시값이 반환된다.', async () => {
      // give
      const video = await videoRepository.save(privateVideoFixture);
      const hash = crypto.createHash('md5').update(video.url).digest('hex');

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .patch(`/api/video/${video.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(200)
        .expect((res) => expect(res.body.hash).toBe(hash));
    });

    it('쿠키 없이 비디오 상태 토글을 요청하면 401 상태 코드가 반환된다.', async () => {
      // given
      const video = await videoRepository.save(videoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.patch(`/api/video/${video.id}`).expect(401);
    });

    it('다른 사람의 비디오 상태 토글을 요청하면 403 상태 코드가 반환된다.', async () => {
      // give
      await memberRepository.save(otherMemberFixture);
      const video = await videoRepository.save(videoOfOtherFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .patch(`/api/video/${video.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(403);
    });

    it('존재하지 않는 비디오 상태 토글을 요청하면 404 상태 코드가 반환된다.', async () => {
      // give
      const video = await videoRepository.save(videoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .patch(`/api/video/${video.id + 1000}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(404);
    });
  });

  describe('deleteVideo', () => {
    it('쿠키를 가지고 비디오의 삭제를 요청하면 204 상태 코드가 반환된다.', async () => {
      // give
      const video = await videoRepository.save(videoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/video/${video.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(204)
        .expect((res) => expect(res.body).toEqual({}));
    });

    it('쿠키 없이 비디오의 삭제를 요청하면 401 상태 코드가 반환된다.', async () => {
      // given
      const video = await videoRepository.save(videoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent.delete(`/api/video/${video.id}`).expect(401);
    });

    it('다른 사람의 비디오의 삭제를 요청하면 403 상태 코드가 반환된다.', async () => {
      // give
      await memberRepository.save(otherMemberFixture);
      const video = await videoRepository.save(videoOfOtherFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/video/${video.id}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(403);
    });

    it('존재하지 않는 비디오의 삭제를 요청하면 404 상태 코드가 반환된다.', async () => {
      // give
      const video = await videoRepository.save(videoFixture);

      // when & then
      const agent = request.agent(app.getHttpServer());
      await agent
        .delete(`/api/video/${video.id + 1000}`)
        .set('Cookie', [`accessToken=${token}`])
        .expect(404);
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
