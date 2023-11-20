import { isEmpty } from 'class-validator';
import { Request } from 'express';
import { Member } from 'src/member/entity/member';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';

export const getTokenValue = (request: Request) => {
  if (request.cookies && request.cookies['accessToken']) {
    return request.cookies['accessToken'].split(' ').pop();
  }

  if (request.get('cookie')) {
    return request.get('cookie').split('Bearer ').pop();
  }

  return '';
};

export const validateManipulatedToken = (member: Member | undefined) => {
  if (isEmpty(member)) throw new ManipulatedTokenNotFiltered();
};
