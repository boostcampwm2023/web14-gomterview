import { HttpException } from '@nestjs/common';

class CategoryNameEmptyException extends HttpException {
  constructor() {
    super('카테고리명을 입력해주세요.', 400);
  }
}

class CategoryNotFoundException extends HttpException {
  constructor() {
    super('카테고리자 존재하지 않습니다.', 404);
  }
}

export { CategoryNameEmptyException, CategoryNotFoundException };
