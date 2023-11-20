import { HttpException } from '@nestjs/common';

class ContentNotFoundException extends HttpException {
  constructor() {
    super('내용을 입력해주세요.', 404);
  }
}

export { ContentNotFoundException };
