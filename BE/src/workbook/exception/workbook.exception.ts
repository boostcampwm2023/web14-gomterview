import { HttpException } from '@nestjs/common';

class WorkbookNotFoundException extends HttpException {
  constructor() {
    super('문제집을 찾을 수 없습니다.', 404);
  }
}

class WorkbookForbiddenException extends HttpException {
  constructor() {
    super('문제집에 대한 권한이 없습니다.', 403);
  }
}

export { WorkbookNotFoundException, WorkbookForbiddenException };
