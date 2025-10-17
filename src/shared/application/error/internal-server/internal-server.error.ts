import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerError extends HttpException {
  constructor(message: string = 'Erro interno do servidor') {
    super(message, HttpStatus.INTERNAL_SERVER_ERROR); // 500
  }
}
