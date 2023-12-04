import { HttpNotFoundException } from '../../util/exception.util';

class QuestionNotFoundException extends HttpNotFoundException {
  constructor() {
    super('해당 질문을 찾을 수 없습니다.', 'Q01');
  }
}

export { QuestionNotFoundException };
