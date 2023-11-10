import { Test, TestingModule } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberResponse } from '../dto/memberResponse';
import { Request } from 'express';
import { Member } from '../entity/member';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';
import { INestApplication } from '@nestjs/common';
import { AppModule } from 'src/app.module';
import * as request from 'supertest';
import { TokenModule } from 'src/token/token.module';
import { TokenService } from 'src/token/service/token.service';

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
    const mockUser = new Member(
      1,
      'test@example.com',
      'TestUser',
      'https://example.com',
      new Date(),
    );

    const mockReq = { user: mockUser };
    const result = memberController.getMyInfo(mockReq as unknown as Request);

    expect(result).toBeInstanceOf(MemberResponse);
    expect(result).toEqual(MemberResponse.from(mockUser));
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
  let tokenService: TokenService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, TokenModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    tokenService = moduleFixture.get<TokenService>(TokenService);
  });

  it('GET /api/member (회원 정보 반환 성공)', async () => {
    const memberId = 1; // 항상 DB에 들어있는 회원의 ID로의 설정이 필요해보입니다.
    const validToken = await tokenService.assignToken(memberId);

    const response = await request(app.getHttpServer())
      .get('/api/member')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200);

    expect(response.body.id).toBe(memberId);
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
