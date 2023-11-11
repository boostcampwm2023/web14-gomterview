import { HttpException } from '@nestjs/common';

class QuestionNotFoundException extends HttpException {
  constructor() {
    super('해당 커스텀 질문이 존재하지 않습니다.', 404);
  }
}

export { QuestionNotFoundException };
