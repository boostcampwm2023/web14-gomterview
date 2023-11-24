import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { VideoRepository } from '../repository/video.repository';
import { memberFixture } from 'src/member/fixture/member.fixture';
import { QuestionRepository } from 'src/question/repository/question.repository';
import { MemberRepository } from 'src/member/repository/member.repository';
import {
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
  VideoAccessForbiddenException,
  VideoNotFoundException,
} from '../exception/video.exception';
import { VideoDetailResponse } from '../dto/videoDetailResponse';
import * as crypto from 'crypto';
import { SingleVideoResponse } from '../dto/singleVideoResponse';
import { getValueFromRedis } from 'src/util/redis.util';

describe('VideoService', () => {
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

    it('비디오 저장 시 member가 없으면 ManipulatedTokenNotFiltered을 반환한다.', () => {
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

    it('preSigned URL 얻기 시 IDrive Client가 Pre-Signed URL 발급에 실패하면 IDriveException을 반환한다.', () => {
      // given
      const member = memberFixture;

      // when
      const getSignedUrlMock = jest.fn();
      (S3.prototype.getSignedUrlPromise as jest.Mock) = getSignedUrlMock;
      getSignedUrlMock.mockRejectedValue(new IDriveException());

      // then
      expect(videoService.getPreSignedUrl(member, request)).rejects.toThrow(
        IDriveException,
      );
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
  });
});
