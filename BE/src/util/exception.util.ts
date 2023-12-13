import { HttpException } from '@nestjs/common';
import {
  BAD_REQUEST,
  FORBIDDEN,
  GONE,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from '../constant/constant';
import { LoggerService } from '../config/logger.config';

const errorLogger = new LoggerService('ERROR');

class HttpCustomException extends HttpException {
  constructor(message: string, errorCode: string, status: number) {
    super({ message: message, errorCode: errorCode }, status);
    errorLogger.error(errorCode, super.stack);
  }
}

class HttpBadRequestException extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, BAD_REQUEST);
  }
}

class HttpUnauthorizedException extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, UNAUTHORIZED);
  }
}

class HttpForbiddenException extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, FORBIDDEN);
  }
}

class HttpNotFoundException extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, NOT_FOUND);
  }
}

class HttpGoneException extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, GONE);
  }
}

class HttpInternalServerError extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, INTERNAL_SERVER_ERROR);
  }
}

export {
  HttpBadRequestException,
  HttpUnauthorizedException,
  HttpForbiddenException,
  HttpNotFoundException,
  HttpGoneException,
  HttpInternalServerError,
};
