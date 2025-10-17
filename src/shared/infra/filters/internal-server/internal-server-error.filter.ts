// src/shared/infrastructure/filters/not-found-exception.filter.ts
import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { FastifyReply, FastifyRequest } from 'fastify';
import { InternalServerError } from 'src/shared/application/error/internal-server/internal-server.error';

@Catch(InternalServerError)
export class InternalServerExceptionFilter implements ExceptionFilter {
  catch(exception: InternalServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const request = ctx.getRequest<FastifyRequest>();

    const status = exception.getStatus();
    const message = exception.message;

    response.status(status).send({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      error: 'Not Found',
      message,
    });
  }
}
