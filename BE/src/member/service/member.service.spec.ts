import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { MemberRepository } from '../repository/member.repository';
import { TokenService } from 'src/token/service/token.service';
import { MemberNicknameResponse } from '../dto/memberNicknameResponse';
import { TokenPayload } from 'src/token/interface/token.interface';
import { memberFixture } from '../fixture/member.fixture';
import {
  InvalidTokenException,
  TokenExpiredException,
} from 'src/token/exception/token.exception';

describe('VideoService 단위 테스트', () => {
  let memberService: MemberService;

  const mockTokenService = {
    getPayload: jest.fn(),
  };

  const mockMemberRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
  };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MemberService, MemberRepository, TokenService],
    })
      .overrideProvider(TokenService)
      .useValue(mockTokenService)
      .overrideProvider(MemberRepository)
      .useValue(mockMemberRepository)
      .compile();

    memberService = module.get<MemberService>(MemberService);
  });

  it('should be defined', () => {
    expect(memberService).toBeDefined();
  });

  describe('getNameForInterview', () => {
    it('면접 화면에 표출할 닉네임 반환 성공 시에는 MemberNicknameResponse 형태로 반환한다.', async () => {
      // given
      const member = memberFixture;
      const req: any = {
        cookies: {
          accessToken: 'fakeAccessToken',
        },
      };

      // when
      mockTokenService.getPayload.mockResolvedValue({
        id: member.id,
      } as TokenPayload);
      mockMemberRepository.findById.mockResolvedValue(member);

      // then
      const result = await memberService.getNameForInterview(req);

      expect(result).toBeInstanceOf(MemberNicknameResponse);
      expect(result.nickname).toContain(member.nickname);
    });

    it('면접 화면에 표출할 닉네임 반환 성공 시 비회원이라면 닉네임에 면접자를 포함하여 반환한다.', async () => {
      // given
      const req: any = {
        cookies: {},
      };

      // when & then
      const result = await memberService.getNameForInterview(req);

      expect(result).toBeInstanceOf(MemberNicknameResponse);
      expect(result.nickname).toContain('면접자');
    });

    it('면접 화면에 표출할 닉네임 반환 시 유효하지 않은 토큰으로 요청한다면 InvalidTokenException을 반환한다.', async () => {
      // given
      const req: any = {
        cookies: {
          accessToken: 'INVALID_TOKEN',
        },
      };

      // when
      mockTokenService.getPayload.mockRejectedValue(
        new InvalidTokenException(),
      );

      //then
      expect(memberService.getNameForInterview(req)).rejects.toThrow(
        InvalidTokenException,
      );
    });

    it('면접 화면에 표출할 닉네임 반환 시 만료된 토큰으로 요청한다면 TokenExpiredException을 반환한다.', async () => {
      // given
      const req: any = {
        cookies: {
          accessToken: 'EXPIRED_TOKEN',
        },
      };

      // when
      mockTokenService.getPayload.mockRejectedValue(
        new TokenExpiredException(),
      );

      //then
      expect(memberService.getNameForInterview(req)).rejects.toThrow(
        TokenExpiredException,
      );
    });
  });
});
