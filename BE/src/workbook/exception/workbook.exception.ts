import {
  HttpForbiddenException,
  HttpNotFoundException,
} from '../../util/exception.util';

class WorkbookNotFoundException extends HttpNotFoundException {
  constructor() {
    super('문제집을 찾을 수 없습니다.', 'W01');
  }
}

class WorkbookForbiddenException extends HttpForbiddenException {
  constructor() {
    super('문제집에 대한 권한이 없습니다.', 'W02');
  }
}

export { WorkbookNotFoundException, WorkbookForbiddenException };
