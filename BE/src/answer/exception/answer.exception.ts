import {
  HttpForbiddenException,
  HttpNotFoundException,
} from '../../util/exception.util';

class AnswerNotFoundException extends HttpNotFoundException {
  constructor() {
    super('해당 답변을 찾을 수 없습니다.', 'A01');
  }
}

class AnswerForbiddenException extends HttpForbiddenException {
  constructor() {
    super('답변에 대한 권한이 없습니다.', 'A02');
  }
}

export { AnswerNotFoundException, AnswerForbiddenException };
