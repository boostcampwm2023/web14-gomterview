import { Test } from '@nestjs/testing';
import { MemberController } from './member.controller';
import { MemberResponse } from '../dto/memberResponse';
import { Request } from 'express';
import { Member } from '../entity/member';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';

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
