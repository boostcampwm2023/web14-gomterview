import {
  HttpGoneException,
  HttpInternalServerError,
  HttpUnauthorizedException,
} from '../../util/exception.util';

class InvalidTokenException extends HttpUnauthorizedException {
  constructor() {
    super('유효하지 않은 토큰입니다.', 'T01');
  }
}

class TokenExpiredException extends HttpGoneException {
  constructor() {
    super('토큰이 만료되었습니다', 'T02');
  }
}

class NeedToLoginException extends HttpUnauthorizedException {
  constructor() {
    super('다시 로그인해주세요.', 'T03');
  }
}

class ManipulatedTokenNotFiltered extends HttpInternalServerError {
  constructor() {
    super('', 'SERVER');
  }
}

export {
  InvalidTokenException,
  TokenExpiredException,
  ManipulatedTokenNotFiltered,
  NeedToLoginException,
};
