import { HttpException } from '@nestjs/common';

class ContentNotFoundException extends HttpException {
  constructor() {
    super('내용을 입력해주세요.', 404);
  }
}

class NeedToFindByCategoryIdException extends HttpException {
  constructor() {
    super('카테고리 id를 입력해주세요 합니다.', 400);
  }
}

export { ContentNotFoundException, NeedToFindByCategoryIdException };
