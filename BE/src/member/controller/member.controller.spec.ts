import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberResponse } from '../dto/memberResponse';
import { Request } from 'express';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/service/auth.service';
import {
  memberFixture,
  mockReqWithMemberFixture,
  oauthRequestFixture,
} from '../fixture/member.fixture';

describe('MemberController', () => {
  let memberController: MemberController;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [MemberController],
    }).compile();
    memberController = moduleRef.get<MemberController>(MemberController);
  });

  it('should be defined', () => {
    expect(memberController).toBeDefined();
  });

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

describe('MemberController (E2E Test)', () => {
  let app: INestApplication;
  let authService: AuthService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, AuthModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    authService = moduleFixture.get<AuthService>(AuthService);
  });

  it('GET /api/member (회원 정보 반환 성공)', async () => {
    const validToken = (await authService.login(oauthRequestFixture)).replace(
      'Bearer ',
      '',
    );
    const response = await request(app.getHttpServer())
      .get('/api/member')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);

    console.log(response.body);

    expect(response.body.email).toBe(oauthRequestFixture.email);
    expect(response.body.nickname).toBe(oauthRequestFixture.name);
    expect(response.body.profileImg).toBe(oauthRequestFixture.img);
  });

  it('GET /api/member (유효하지 않은 토큰 사용으로 인한 회원 정보 반환 실패)', async () => {
    const invalidToken = 'INVALID_TOKEN';

    await request(app.getHttpServer())
      .get('/api/member')
      .set('Authorization', `Bearer ${invalidToken}`)
      .expect(401);
  });

  afterAll(async () => {
    await app.close();
  });
});
