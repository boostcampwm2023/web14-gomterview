import { isEmpty } from 'class-validator';
import { Request } from 'express';
import { Member } from 'src/member/entity/member';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';

export const getTokenValue = (request: Request) => {
  if (request.cookies && request.cookies['accessToken']) {
    return request.cookies['accessToken'].split(' ').pop();
  }

  return null;
};

export const validateManipulatedToken = (member: Member | undefined) => {
  if (isEmpty(member)) throw new ManipulatedTokenNotFiltered();
};
