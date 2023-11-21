import { HttpException } from '@nestjs/common';

export class IDriveException extends HttpException {
  constructor() {
    super('IDrive 제공 API 처리 도중 에러가 발생하였습니다.', 500);
  }
}

export class VideoAccessForbiddenException extends HttpException {
  constructor() {
    super('해당 비디오에 접근 권한이 없습니다.', 403);
  }
}

export class VideoNotFoundException extends HttpException {
  constructor() {
    super('존재하지 않는 비디오입니다.', 404);
  }
}

export class EncryptionException extends HttpException {
  constructor() {
    super('암호화 중 에러가 발생했습니다.', 500);
  }
}

export class DecryptionException extends HttpException {
  constructor() {
    super('복호화 중 에러가 발생했습니다.', 500);
  }
}

export class VideoOfWithdrawnMemberException extends HttpException {
  constructor() {
    super('탈퇴한 회원의 비디오를 조회할 수 없습니다.', 404);
  }
}
