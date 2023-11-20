import { Test, TestingModule } from '@nestjs/testing';
import { VideoController } from './video.controller';
import { VideoService } from '../service/video.service';
import { mockReqWithMemberFixture } from 'src/member/fixture/member.fixture';
import { CreateVideoRequest } from '../dto/createVideoRequest';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';
import { Request } from 'express';
import { CreatePreSignedUrlRequest } from '../dto/createPreSignedUrlRequest';
import { PreSignedUrlResponse } from '../dto/preSignedUrlResponse';
import { IDriveException } from '../exception/video.exception';

describe('VideoController', () => {
  let controller: VideoController;

  const mockVideoService = {
    createVideo: jest.fn(),
    getPreSignedUrl: jest.fn(),
    getVideoDetail: jest.fn(),
    getVideoDetailByHash: jest.fn(),
    toggleVmideoStatus: jest.fn(),
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
      await expect(
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
      await expect(async () => {
        await controller.createVideo(member, createVideoRequest);
      }).rejects.toThrow(ManipulatedTokenNotFiltered);
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
      await expect(async () => {
        await controller.getPreSignedUrl(
          mockReqWithMemberFixture,
          createPreSignedUrlRequest,
        );
      }).rejects.toThrow(IDriveException);
    });

    it('Pre-Signed URL 생성 시 회원 객체가 없으면 ManipulatedTokenNotFilteredException을 반환한다.', async () => {
      // given
      const member = { user: null } as unknown as Request;

      // when
      mockVideoService.getPreSignedUrl.mockRejectedValue(
        new ManipulatedTokenNotFiltered(),
      );

      // then
      await expect(async () => {
        await controller.getPreSignedUrl(member, createPreSignedUrlRequest);
      }).rejects.toThrow(ManipulatedTokenNotFiltered);
    });
  });
});
