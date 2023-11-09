import { Test, TestingModule } from '@nestjs/testing';
import { AccessTokenStrategy } from './access.token.strategy';
import { MemberRepository } from 'src/member/repository/member.repository';
import { Member } from 'src/member/entity/member';
import { InvalidTokenException } from '../exception/token.exception';

describe('AccessTokenStrategy', () => {
  let strategy: AccessTokenStrategy;
  let memberRepositoryMock: jest.Mocked<MemberRepository>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AccessTokenStrategy,
        {
          provide: MemberRepository,
          useFactory: () => ({
            findById: jest.fn(),
          }),
        },
      ],
    }).compile();

    strategy = module.get<AccessTokenStrategy>(AccessTokenStrategy);
    memberRepositoryMock = module.get<MemberRepository>(
      MemberRepository,
    ) as jest.Mocked<MemberRepository>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return user if token is valid', async () => {
    const mockUserId = 1938;
    const mockUser = new Member(
      mockUserId,
      'test@example.com',
      'TestUser',
      'https://example.com',
      new Date(),
    );
    const mockPayload = { id: mockUserId };
    memberRepositoryMock.findById.mockResolvedValueOnce(mockUser);

    const result = await strategy.validate(mockPayload);

    expect(memberRepositoryMock.findById).toHaveBeenCalledWith(mockUserId);
    expect(result).toEqual(mockUser);
  });

  it('should throw InvalidTokenException if user not found', async () => {
    const mockUserId = 209;

    memberRepositoryMock.findById.mockResolvedValueOnce(undefined);

    await expect(strategy.validate({ id: mockUserId })).rejects.toThrow(
      InvalidTokenException,
    );
    expect(memberRepositoryMock.findById).toHaveBeenCalledWith(mockUserId);
  });
});
