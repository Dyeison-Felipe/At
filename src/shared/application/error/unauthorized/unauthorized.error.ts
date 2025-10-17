import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
  constructor(messsge: string) {
    super(messsge, HttpStatus.UNAUTHORIZED);
  }
}
