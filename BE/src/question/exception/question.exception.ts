import {
  HttpForbiddenException,
  HttpNotFoundException,
} from '../../util/exception.util';

class QuestionNotFoundException extends HttpNotFoundException {
  constructor() {
    super('해당 질문을 찾을 수 없습니다.', 'Q01');
  }
}

class QuestionForbiddenException extends HttpForbiddenException {
  constructor() {
    super('질문에 대한 권한이 없습니다.', 'Q02');
  }
}

export { QuestionNotFoundException, QuestionForbiddenException };
