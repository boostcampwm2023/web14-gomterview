import {
  HttpBadRequestException,
  HttpForbiddenException,
  HttpInternalServerError,
  HttpNotFoundException,
} from 'src/util/exception.util';

export class IDriveException extends HttpInternalServerError {
  constructor() {
    super('비디오 업로드 API 처리 도중 에러가 발생하였습니다.', 'V01');
  }
}

export class VideoAccessForbiddenException extends HttpForbiddenException {
  constructor() {
    super('해당 비디오에 접근 권한이 없습니다.', 'V02');
  }
}

export class VideoNotFoundException extends HttpNotFoundException {
  constructor() {
    super('존재하지 않는 비디오입니다.', 'V03');
  }
}

export class VideoOfWithdrawnMemberException extends HttpNotFoundException {
  constructor() {
    super('탈퇴한 회원의 비디오를 조회할 수 없습니다.', 'V04');
  }
}

export class RedisDeleteException extends HttpInternalServerError {
  constructor() {
    super('비디오 정보 삭제 중 오류가 발생하였습니다.', 'V05');
  }
}

export class RedisRetrieveException extends HttpInternalServerError {
  constructor() {
    super('비디오 정보를 가져오는 중 오류가 발생하였습니다.', 'V06');
  }
}

export class RedisSaveException extends HttpInternalServerError {
  constructor() {
    super('비디오 정보 저장 중 오류가 발생하였습니다.', 'V07');
  }
}

export class Md5HashException extends HttpInternalServerError {
  constructor() {
    super('해시 생성 중 오류가 발생했습니다.', 'V08');
  }
}

export class VideoNotFoundWithHashException extends HttpNotFoundException {
  constructor() {
    super('해당 해시값으로 등록된 비디오를 조회할 수 없습니다.', 'V09');
  }
}

export class InvalidHashException extends HttpBadRequestException {
  constructor() {
    super('유효하지 않은 해시값입니다.', 'V10');
  }
}
