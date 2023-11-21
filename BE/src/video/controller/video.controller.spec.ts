import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from '../service/video.service';
import { mockReqWithMemberFixture } from 'src/member/fixture/member.fixture';
import { CreateVideoRequest } from '../dto/createVideoRequest';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';
import { Request, Response } from 'express';
import { CreatePreSignedUrlRequest } from '../dto/createPreSignedUrlRequest';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';
import {
  DecryptionException,
  EncryptionException,
  IDriveException,
  VideoAccessForbiddenException,
  VideoNotFoundException,
} from '../exception/video.exception';
import { VideoListResponse } from '../dto/videoListResponse';
import {
  videoFixtureForTest,
  videoListFixtureForTest,
} from '../fixture/video.fixture';
import { VideoDetailResponse } from '../dto/videoDetailResponse';
import { VideoHashResponse } from '../dto/videoHashResponse';

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
    const createVideoRequest = new CreateVideoRequest(
      1,
      'test.webm',
      'https://test.com',
    );

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
    const createPreSignedUrlRequest = new CreatePreSignedUrlRequest(1);

    it('Pre-Signed URL 발급 완료 시 PreSignedUrlResponse 객체 형태로 응답된다.', async () => {
      //given

      //when
      mockVideoService.getPreSignedUrl.mockResolvedValue(
        new PreSignedUrlResponse('fakePreSignedUrl', 'fakeKey'),
      );

      //then
      const result = await controller.getPreSignedUrl(
        mockReqWithMemberFixture,
        createPreSignedUrlRequest,
      );

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
        controller.getPreSignedUrl(
          mockReqWithMemberFixture,
          createPreSignedUrlRequest,
        ),
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
      expect(
        controller.getPreSignedUrl(member, createPreSignedUrlRequest),
      ).rejects.toThrow(ManipulatedTokenNotFiltered);
    });
  });

  describe('getAllVideo', () => {
    it('비디오 전체 조회 성공 시 VideoListResponse 객체 형태로 응답된다.', async () => {
      //given
      const videoList = videoListFixtureForTest;

      //when
      const mockVideoListResponse = VideoListResponse.from(videoList);
      mockVideoService.getAllVideosByMemberId.mockResolvedValue(
        mockVideoListResponse,
      );

      //then
      const result = await controller.getAllVideo(mockReqWithMemberFixture);

      expect(result).toBeInstanceOf(VideoListResponse);
      expect(result).toBe(mockVideoListResponse);
      expect(result.videoList).toBe(mockVideoListResponse.videoList);
    });

    it('비디오 전체 조회 시 회원이 저장한 비디오가 없으면 빈 배열을 반환한다.', async () => {
      //given
      const emptyVideoList = [];
      const mockVideoListResponse = VideoListResponse.from(emptyVideoList);

      //when
      mockVideoService.getAllVideosByMemberId.mockResolvedValue(
        mockVideoListResponse,
      );

      //then
      const result = await controller.getAllVideo(mockReqWithMemberFixture);

      expect(result).toBeInstanceOf(VideoListResponse);
      expect(result.videoList).toStrictEqual(emptyVideoList);
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

    it('해시로 비디오 조회 성공 시 VideoDetailResponse 객체 형태로 응답된다.', async () => {
      // given
      const video = videoFixtureForTest;

      // when
      const mockVideoDetailWithHash = VideoDetailResponse.from(video, hash);
      mockVideoService.getVideoDetailByHash.mockResolvedValue(
        mockVideoDetailWithHash,
      );

      // then
      const result = await controller.getVideoDetailByHash(hash);

      expect(result).toBeInstanceOf(VideoDetailResponse);
      expect(result).toBe(mockVideoDetailWithHash);
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

    it('해시로 비디오 조회 시 복호화에 실패하면 DecryptionException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetailByHash.mockRejectedValue(
        new DecryptionException(),
      );

      // then
      expect(controller.getVideoDetailByHash(hash)).rejects.toThrow(
        DecryptionException,
      );
    });
  });

  describe('getVideoDetail', () => {
    const mockReq = mockReqWithMemberFixture;
    const hash = 'fakeHash';
    const video = videoFixtureForTest;

    it('비디오 상세 정보 조회 성공 시 VideoDetailResponse 객체 형태로 응답된다.', async () => {
      // given

      // when
      const mockVideoDetailWithHash = VideoDetailResponse.from(video, hash);
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
      const mockVideoDetailWithHash = VideoDetailResponse.from(video, null);
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

    it('비디오 상세 정보 조회 시 암호화에 실패하면 EncryptionException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.getVideoDetail.mockRejectedValue(
        new EncryptionException(),
      );

      // then
      expect(controller.getVideoDetail(1, mockReq)).rejects.toThrow(
        EncryptionException,
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

    it('비디오 상세 정보 조회 시 회원 객체가 없으면 ManipulatedTokenNotFilteredException을 반환한다.', async () => {
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

    it('비디오 상세 정보 조회 시 해당 비디오가 삭제되었다면 VideoNotFoundException를 반환한다.', async () => {
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

    it('비디오 상세 정보 조회 시 다른 회원의 비디오를 조회하려 한다면 VideoAccessForbiddenException를 반환한다.', async () => {
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

    it('비디오 상세 정보 조회 시 암호화에 실패하면 EncryptionException을 반환한다.', async () => {
      // given

      // when
      mockVideoService.toggleVideoStatus.mockRejectedValue(
        new EncryptionException(),
      );

      // then
      expect(controller.toggleVideoStatus(1, member)).rejects.toThrow(
        EncryptionException,
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
