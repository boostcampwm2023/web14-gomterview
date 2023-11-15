import { isEmpty } from 'class-validator';
import { Request } from 'express';
import { Member } from 'src/member/entity/member';
import { ManipulatedTokenNotFiltered } from 'src/token/exception/token.exception';

export const getTokenValue = (request: Request) =>
  request.cookies['accessToken'].split(' ').pop();

export const validateManipulatedToken = (member: Member | undefined) => {
  if (isEmpty(member)) throw new ManipulatedTokenNotFiltered();
};
