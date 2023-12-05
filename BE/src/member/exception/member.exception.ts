import { HttpNotFoundException } from 'src/util/exception.util';

export class MemberNotFoundException extends HttpNotFoundException {
  constructor() {
    super('회원을 찾을 수 없습니다.', 'M01');
  }
}
