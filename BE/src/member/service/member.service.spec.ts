import { Test, TestingModule } from '@nestjs/testing';
import { MemberService } from './member.service';
import { MemberRepository } from '../repository/member.repository';
import { TokenService } from 'src/token/service/token.service';
import { MemberNicknameResponse } from '../dto/memberNicknameResponse';
import { TokenPayload } from 'src/token/interface/token.interface';
import { memberFixture, oauthRequestFixture } from '../fixture/member.fixture';
import {
  InvalidTokenException,
  TokenExpiredException,
} from 'src/token/exception/token.exception';
import { INestApplication } from '@nestjs/common';
import { MemberModule } from '../member.module';
import { addAppModules, createIntegrationTestModule } from 'src/util/test.util';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/service/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('MemberService 단위 테스트', () => {
  let memberService: MemberService;

  const mockTokenService = {
    getPayload: jest.fn(),
  };

  const mockMemberRepository = {
    save: jest.fn(),
    findById: jest.fn(),
    findByEmail: jest.fn(),
  };

  jest.mock('typeorm-transactional', () => ({
    Transactional: () => () => ({}),
  }));

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
    it('면접 화면에 표출할 닉네임 반환 성공 시에는 MemberNicknameResponse 형식으로 반환한다.', async () => {
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

describe('MemberService 통합 테스트', () => {
  let app: INestApplication;
  let memberService: MemberService;
  let authService: AuthService;
  let jwtService: JwtService;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const modules = [MemberModule, AuthModule];
    const moduleFixture: TestingModule =
      await createIntegrationTestModule(modules);

    app = moduleFixture.createNestApplication();
    addAppModules(app);
    await app.init();

    memberService = moduleFixture.get<MemberService>(MemberService);
    authService = moduleFixture.get<AuthService>(AuthService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  describe('getNameForInterview', () => {
    it('면접 화면에 표출할 닉네임 반환 성공 시 MemberNicknameResponse 형식으로 반환된다.', async () => {
      // given
      const accessToken = await authService.login(oauthRequestFixture);
      const req: any = {
        cookies: {
          accessToken,
        },
      };

      // when
      const result = await memberService.getNameForInterview(req);

      // then
      expect(result).toBeInstanceOf(MemberNicknameResponse);
      expect(result.nickname).toContain(oauthRequestFixture.name);
    });

    it('면접 화면에 표출할 닉네임 반환 성공 시 비회원이라면 닉네임에 면접자를 포함하여 반환한다.', async () => {
      // given
      const req: any = {
        cookies: {},
      };

      // when
      const result = await memberService.getNameForInterview(req);

      // then
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

      // when & then
      expect(memberService.getNameForInterview(req)).rejects.toThrow(
        InvalidTokenException,
      );
    });

    it('면접 화면에 표출할 닉네임 반환 시 만료된 토큰으로 요청한다면 TokenExpiredException을 반환한다.', async () => {
      // given
      const expirationTime = -1;
      const expiredToken = await jwtService.signAsync(
        { id: memberFixture.id } as TokenPayload,
        {
          expiresIn: expirationTime,
        },
      );
      const req: any = {
        cookies: {
          accessToken: expiredToken,
        },
      };

      // when & then
      expect(memberService.getNameForInterview(req)).rejects.toThrow(
        TokenExpiredException,
      );
    });
  });

  afterEach(async () => {
    await memberRepository.query('delete from Member');
    await memberRepository.query('DELETE FROM sqlite_sequence'); // Auto Increment 초기화
  });
});
