import { Test, TestingModule } from '@nestjs/testing';
import { VideoService } from './video.service';
import { VideoRepository } from '../repository/video.repository';
import { memberFixture } from 'src/member/fixture/member.fixture';
import { QuestionRepository } from 'src/question/repository/question.repository';
import { MemberRepository } from 'src/member/repository/member.repository';
import { createVideoRequestFixture } from '../fixture/video.fixture';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';

describe('VideoService', () => {
  let videoService: VideoService;

  const mockVideoRepository = {
    save: jest.fn(),
    finById: jest.fn(),
    findByUrl: jest.fn(),
    findAllVideosByMemberId: jest.fn(),
    toggleVideoStatus: jest.fn(),
    remove: jest.fn(),
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
      .useValue({})
      .overrideProvider(QuestionRepository)
      .useValue({})
      .compile();

    videoService = module.get<VideoService>(VideoService);
  });

  it('should be defined', () => {
    expect(videoService).toBeDefined();
  });

  describe('createVideo', () => {
    it('비디오 저장 성공시 undefined로 반환된다.', async () => {
      // given
      const member = memberFixture;
      const request = createVideoRequestFixture;

      // when
      mockVideoRepository.save.mockResolvedValue(undefined);

      // then
      expect(
        videoService.createVideo(member, request),
      ).resolves.toBeUndefined();
    });

    it('비디오 저장 시 member가 없으면 ManipulatedTokenNotFiltered을 반환한다.', async () => {
      // given
      const member = undefined;
      const request = createVideoRequestFixture;

      // when

      // then
      expect(videoService.createVideo(member, request)).rejects.toThrow(
        ManipulatedTokenNotFiltered,
      );
    });
  });
});
