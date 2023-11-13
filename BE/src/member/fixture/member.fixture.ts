import { Member } from '../entity/member';
import { OAuthRequest } from '../../auth/interface/auth.interface';
import { Request } from 'express';

export const memberFixture = new Member(
  1,
  'test@example.com',
  'TestUser',
  'https://example.com',
  new Date(),
);

export const oauthRequestFixture = {
  email: 'fixture@example.com',
  name: 'fixture',
  img: 'https://test.com',
} as OAuthRequest;

export const mockReqWithMemberFixture = {
  user: memberFixture,
} as unknown as Request;
