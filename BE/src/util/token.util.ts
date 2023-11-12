import { Request } from 'express';

export const getTokenValue = (request: Request) =>
  request.cookies['accessToken'].split(' ').pop();
