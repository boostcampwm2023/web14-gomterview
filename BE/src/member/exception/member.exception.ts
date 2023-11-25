import { HttpException } from '@nestjs/common';

export class MemberNotFoundException extends HttpException {
  constructor() {
    super('회원을 찾을 수 없습니다.', 404);
  }
}
