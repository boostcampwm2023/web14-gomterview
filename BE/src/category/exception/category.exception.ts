import { HttpException } from '@nestjs/common';

class CategoryNameEmptyException extends HttpException {
  constructor() {
    super('카테고리명을 입력해주세요.', 400);
  }
}

export { CategoryNameEmptyException };
