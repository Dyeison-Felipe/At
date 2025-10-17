import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestError extends HttpException {
  constructor(messsge: string) {
    super(messsge, HttpStatus.BAD_REQUEST);
  }
}
