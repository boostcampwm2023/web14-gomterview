import { HttpException } from '@nestjs/common';
import { HttpNotFoundException } from '../../util/exception.util';

class WorkbookNotFoundException extends HttpNotFoundException {
  constructor() {
    super('문제집을 찾을 수 없습니다.', 'W01');
  }
}

class WorkbookForbiddenException extends HttpException {
  constructor() {
    super({ message: '문제집에 대한 권한이 없습니다.', errorCode: 'W02' }, 403);
  }
}

export { WorkbookNotFoundException, WorkbookForbiddenException };
