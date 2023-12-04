import { HttpException } from '@nestjs/common';
import {
  BAD_REQUEST,
  FORBIDDEN,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  UNAUTHORIZED,
} from '../constant/constant';

class HttpCustomException extends HttpException {
  constructor(message: string, errorCode: string, status: number) {
    super({ message: message, errorCode: errorCode }, status);
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
  HttpInternalServerError,
};
