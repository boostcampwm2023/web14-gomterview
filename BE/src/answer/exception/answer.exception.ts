import { HttpException } from '@nestjs/common';

class AnswerNotFoundException extends HttpException {
  constructor() {
    super('해당 답변을 찾을 수 없습니다.', 404);
  }
}

export { AnswerNotFoundException };
