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

export const differentMemberFixture = new Member(
  2,
  'jang@jang.com',
  'jang',
  'https://jangsarchive.tistory.com',
  new Date(),
);

export const otherMemberFixture = new Member(
  999,
  'other@example.com',
  'other',
  'https://other.com',
  new Date(),
);

export const memberFixturesOAuthRequest = {
  email: 'test@example.com',
  name: 'TestUser',
  img: 'https://example.com',
} as OAuthRequest;

export const oauthRequestFixture = {
  email: 'fixture@example.com',
  name: 'fixture',
  img: 'https://test.com',
} as OAuthRequest;

export const mockReqWithMemberFixture = {
  user: memberFixture,
} as unknown as Request;
