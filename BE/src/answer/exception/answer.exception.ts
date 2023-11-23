import { HttpException } from '@nestjs/common';

class AnswerNotFoundException extends HttpException {
  constructor() {
    super('해당 답변을 찾을 수 없습니다.', 404);
  }
}

class AnswerForbiddenException extends HttpException {
  constructor() {
    super('답변에 대한 권한이 없습니다', 403);
  }
}

export { AnswerNotFoundException, AnswerForbiddenException };
