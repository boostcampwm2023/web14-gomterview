import { HttpException } from '@nestjs/common';

export class IDriveException extends HttpException {
  constructor() {
    super('IDrive 제공 API 처리 도중 에러가 발생하였습니다.', 500);
  }
}
