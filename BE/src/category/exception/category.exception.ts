import { HttpNotFoundException } from '../../util/exception.util';

class CategoryNotFoundException extends HttpNotFoundException {
  constructor() {
    super('카테고리가 존재하지 않습니다.', 'C02');
  }
}

export { CategoryNotFoundException };
