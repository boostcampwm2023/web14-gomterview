import { HttpException } from '@nestjs/common';

class HttpCustomException extends HttpException {
  constructor(message: string, errorCode: string, status: number) {
    super({ message: message, errorCode: errorCode }, status);
  }
}

class HttpBadRequestException extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, 400);
  }
}

class HttpUnauthorizedException extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, 401);
  }
}

class HttpForbiddenException extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, 403);
  }
}

class HttpNotFoundException extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, 404);
  }
}

class HttpInternalServerError extends HttpCustomException {
  constructor(message: string, errorCode: string) {
    super(message, errorCode, 500);
  }
}

export {
  HttpBadRequestException,
  HttpUnauthorizedException,
  HttpForbiddenException,
  HttpNotFoundException,
  HttpInternalServerError,
};
