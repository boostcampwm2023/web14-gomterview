import { Request } from 'express';

export const getTokenValue = (request: Request) =>
  request.header('Authorization').split(' ').pop();
