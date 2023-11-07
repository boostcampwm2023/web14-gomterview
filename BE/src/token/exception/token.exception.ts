import { HttpException } from '@nestjs/common';

class InvalidTokenException extends HttpException {
  constructor() {
    super('유효하지 않은 토큰입니다.', 401);
  }
}

class TokenExpiredException extends HttpException {
  constructor() {
    super('토큰이 만료되었습니다', 410);
  }
}

class ManipulatedTokenNotFiltered extends HttpException {
  constructor() {
    super('토큰 암호화가 뚫렸습니다.', 500);
  }
}

export {
  InvalidTokenException,
  TokenExpiredException,
  ManipulatedTokenNotFiltered,
};
