import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenError extends HttpException {
  constructor(messsge: string) {
    super(messsge, HttpStatus.FORBIDDEN);
  }
}
