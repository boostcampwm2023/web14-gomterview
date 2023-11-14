import { HttpException } from '@nestjs/common';

class QuestionNotFoundException extends HttpException {
  constructor() {
    super('해당 커스텀 질문이 존재하지 않습니다.', 404);
  }
}

class ContentEmptyException extends HttpException {
  constructor() {
    super('나만의 질문의 내용을 입력해야 합니다.', 400);
  }
}

export { QuestionNotFoundException, ContentEmptyException };
