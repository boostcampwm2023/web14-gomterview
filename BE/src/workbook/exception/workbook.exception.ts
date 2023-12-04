import {
  HttpBadRequestException,
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

class NeedToFindByWorkbookIdException extends HttpBadRequestException {
  constructor() {
    super('문제집 id를 입력해주세요.', 'W03');
  }
}

export {
  WorkbookNotFoundException,
  WorkbookForbiddenException,
  NeedToFindByWorkbookIdException,
};
