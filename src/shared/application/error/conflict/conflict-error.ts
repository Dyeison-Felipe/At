import { HttpException, HttpStatus } from '@nestjs/common';

export class ConflictError extends HttpException {
  constructor(messsge: string) {
    super(messsge, HttpStatus.CONFLICT);
  }
}
