import { HttpException, HttpStatus } from '@nestjs/common';

export class TooManyRequestsError extends HttpException {
  constructor(message: string = 'Muitas requisições') {
    super(message, HttpStatus.TOO_MANY_REQUESTS); // 429
  }
}
