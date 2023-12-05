import {
  HttpForbiddenException,
  HttpInternalServerError,
  HttpNotFoundException,
} from 'src/util/exception.util';

export class IDriveException extends HttpInternalServerError {
  constructor() {
    super('IDrive 제공 API 처리 도중 에러가 발생하였습니다.', 'V1');
  }
}

export class VideoAccessForbiddenException extends HttpForbiddenException {
  constructor() {
    super('해당 비디오에 접근 권한이 없습니다.', 'V2');
  }
}

export class VideoNotFoundException extends HttpNotFoundException {
  constructor() {
    super('존재하지 않는 비디오입니다.', 'V3');
  }
}

export class VideoOfWithdrawnMemberException extends HttpNotFoundException {
  constructor() {
    super('탈퇴한 회원의 비디오를 조회할 수 없습니다.', 'V4');
  }
}

export class RedisDeleteException extends HttpInternalServerError {
  constructor() {
    super('Redis에서 비디오 정보 삭제 중 오류가 발생하였습니다.', 'V5');
  }
}

export class RedisRetrieveException extends HttpInternalServerError {
  constructor() {
    super('Redis에서 비디오 정보를 가져오는 중 오류가 발생하였습니다.', 'V6');
  }
}

export class RedisSaveException extends HttpInternalServerError {
  constructor() {
    super('Redis에 비디오 정보 저장 중 오류가 발생하였습니다.', 'V7');
  }
}

export class Md5HashException extends HttpInternalServerError {
  constructor() {
    super('MD5 해시 생성 중 오류가 발생했습니다.', 'V8');
  }
}
