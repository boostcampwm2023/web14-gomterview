import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberResponse } from '../dto/memberResponse';
import { Request } from 'express';
import {
  InvalidTokenException,
  ManipulatedTokenNotFiltered,
  TokenExpiredException,
} from 'src/token/exception/token.exception';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/service/auth.service';
import {
  memberFixture,
  mockReqWithMemberFixture,
  oauthRequestFixture,
} from '../fixture/member.fixture';
import { MemberService } from '../service/member.service';
import { TokenService } from '../../token/service/token.service';
import { TokenModule } from '../../token/token.module';
import { MemberModule } from '../member.module';
import {
  addAppModules,
  createIntegrationTestModule,
} from '../../util/test.util';
import { MemberNicknameResponse } from '../dto/memberNicknameResponse';
import { MemberRepository } from '../repository/member.repository';
import { JwtService } from '@nestjs/jwt';
import { TokenPayload } from 'src/token/interface/token.interface';

describe('MemberController 단위 테스트', () => {
  let memberController: MemberController;

  const mockMemberService = {
    getNameForInterview: jest.fn(),
  };
  const mockTokenService = {};

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [MemberService, TokenService],
      controllers: [MemberController],
    })
      .overrideProvider(MemberService)
      .useValue(mockMemberService)
      .overrideProvider(TokenService)
      .useValue(mockTokenService)
      .compile();
    memberController = moduleRef.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(memberController).toBeDefined();
  });

  describe('getMyInfo', () => {
    it('should return member information as MemberResponse type', async () => {
      const result = memberController.getMyInfo(
        mockReqWithMemberFixture as unknown as Request,
      );

      expect(result).toBeInstanceOf(MemberResponse);
      expect(result).toEqual(MemberResponse.from(memberFixture));
      expect(result['id']).toBe(1);
      expect(result['email']).toBe('test@example.com');
      expect(result['nickname']).toBe('TestUser');
      expect(result['profileImg']).toBe('https://example.com');
    });

    it('should handle invalid user in the request', async () => {
      const mockUser = undefined;
      const mockReq = { user: mockUser };
      expect(() =>
        memberController.getMyInfo(mockReq as unknown as Request),
      ).toThrow(ManipulatedTokenNotFiltered);
    });
  });

  describe('getNameForInterview', () => {
    const nickname = 'fakeNickname';

    it('면접 화면에 표출할 닉네임 반환 성공 시에는 MemberNicknameResponse 형식으로 반환한다.', async () => {
      // given
      const mockReq = mockReqWithMemberFixture;

      // when
      mockMemberService.getNameForInterview.mockResolvedValue(
        new MemberNicknameResponse(nickname),
      );

      // then
      const result = await memberController.getNameForInterview(mockReq);

      expect(result).toBeInstanceOf(MemberNicknameResponse);
      expect(result.nickname).toBe(nickname);
    });

    it('면접 화면에 표출할 닉네임 반환 시 토큰이 만료되었으면 TokenExpiredException을 반환한다.', async () => {
      // given
      const mockReq = mockReqWithMemberFixture;

      // when
      mockMemberService.getNameForInterview.mockRejectedValue(
        new TokenExpiredException(),
      );

      // then
      expect(memberController.getNameForInterview(mockReq)).rejects.toThrow(
        TokenExpiredException,
      );
    });

    it('면접 화면에 표출할 닉네임 반환 시 토큰이 유효하지 않으면 InvalidTokenException을 반환한다.', async () => {
      // given
      const mockReq = mockReqWithMemberFixture;

      // when
      mockMemberService.getNameForInterview.mockRejectedValue(
        new InvalidTokenException(),
      );

      // then
      expect(memberController.getNameForInterview(mockReq)).rejects.toThrow(
        InvalidTokenException,
      );
    });
  });
});

describe('MemberController 통합 테스트', () => {
  let app: INestApplication;
  let authService: AuthService;
  let jwtService: JwtService;
  let memberRepository: MemberRepository;

  beforeAll(async () => {
    const modules = [AuthModule, TokenModule, MemberModule];

    const moduleFixture: TestingModule =
      await createIntegrationTestModule(modules);

    app = moduleFixture.createNestApplication();
    addAppModules(app);
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
    jwtService = moduleFixture.get<JwtService>(JwtService);
    memberRepository = moduleFixture.get<MemberRepository>(MemberRepository);
  });

  describe('getMyInfo', () => {
    it('쿠키를 가지고 회원 정보 반환 요청을 하면 200 상태 코드와 회원 정보가 반환된다.', (done) => {
      authService.login(oauthRequestFixture).then((validToken) => {
        const agent = request.agent(app.getHttpServer());
        agent
          .get('/api/member')
          .set('Cookie', [`accessToken=${validToken}`])
          .expect(200)
          .then((response) => {
            expect(response.body.email).toBe(oauthRequestFixture.email);
            expect(response.body.nickname).toBe(oauthRequestFixture.name);
            expect(response.body.profileImg).toBe(oauthRequestFixture.img);
            done();
          });
      });
    });

    it('유효하지 않은 토큰으로 회원 정보 반환을 요청하면 401 상태코드가 반환된다.', () => {
      const agent = request.agent(app.getHttpServer());
      agent
        .get('/api/member')
        .set('Cookie', [`accessToken=Bearer INVALID_TOKEN`])
        .expect(401);
    });
  });

  describe('getNameForInterview', () => {
    it('쿠키를 가지고 면접 화면에 표출할 닉네임 반환 요청을 하면 200 상태 코드와 회원 닉네임이 들어간 채로 반환된다.', (done) => {
      authService.login(oauthRequestFixture).then((validToken) => {
        const agent = request.agent(app.getHttpServer());
        agent
          .get('/api/member/name')
          .set('Cookie', [`accessToken=${validToken}`])
          .expect(200)
          .then((response) => {
            expect(
              response.body.nickname.endsWith(oauthRequestFixture.name),
            ).toBeTruthy();
            done();
          });
      });
    });

    it('유효하지 않은 토큰으로 면접 화면에 표출할 닉네임 반환을 요청하면 401 상태코드가 반환된다.', () => {
      const agent = request.agent(app.getHttpServer());
      agent
        .get('/api/member/name')
        .set('Cookie', [`accessToken=Bearer INVALID_TOKEN`])
        .expect(401);
    });

    it('만료된 토큰으로 면접 화면에 표출할 닉네임 반환을 요청하면 410 상태코드가 반환된다.', async () => {
      const expirationTime = -1;
      const expiredToken = await jwtService.signAsync(
        { id: memberFixture.id } as TokenPayload,
        {
          expiresIn: expirationTime,
        },
      );

      const agent = request.agent(app.getHttpServer());
      agent
        .get('/api/member/name')
        .set('Cookie', [`accessToken=${expiredToken}`])
        .expect(410);
    });
  });

  afterEach(async () => {
    await memberRepository.query('delete from Member');
    await memberRepository.query('DELETE FROM sqlite_sequence'); // Auto Increment 초기화
  });

  afterAll(async () => await app.close());
});
