import { HttpException, HttpStatus } from '@nestjs/common';

export class UnprocessableEntityError extends HttpException {
  constructor(messsge: string) {
    super(messsge, HttpStatus.UNPROCESSABLE_ENTITY);
  }
}
