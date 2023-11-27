import { HttpException } from '@nestjs/common';

class WorkbookNotFoundException extends HttpException {
  constructor() {
    super('문제집을 찾을 수 없습니다.', 404);
  }
}

export { WorkbookNotFoundException };
