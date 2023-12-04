import { HttpException } from '@nestjs/common';

class QuestionNotFoundException extends HttpException {
  constructor() {
    super('해당 질문을 찾을 수 없습니다.', 404);
  }
}

export { QuestionNotFoundException };
