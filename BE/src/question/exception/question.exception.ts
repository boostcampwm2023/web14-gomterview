import { HttpException } from '@nestjs/common';

class ContentNotFoundException extends HttpException {
  constructor() {
    super('내용을 입력해주세요.', 404);
  }
}

class NeedToFindByCategoryIdException extends HttpException {
  constructor() {
    super('카테고리 id를 입력해주세요.', 400);
  }
}

class QuestionNotFoundException extends HttpException {
  constructor() {
    super('해당 질문을 찾을 수 없습니다.', 404);
  }
}

export {
  ContentNotFoundException,
  NeedToFindByCategoryIdException,
  QuestionNotFoundException,
};
