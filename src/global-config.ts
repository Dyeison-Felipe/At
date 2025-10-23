import { NestFastifyApplication } from '@nestjs/platform-fastify';
import { EnvConfig } from './shared/application/env-config/env-config';
import { NotFoundExceptionFilter } from './shared/infra/filters/not-found/not-found-error.filter';
import { ConflictExceptionFilter } from './shared/infra/filters/conflict/conflict-error.filter';
import { BadRequestExceptionFilter } from './shared/infra/filters/bad-request/bad-request-error.filter';
import { TooManyRequestExceptionFilter } from './shared/infra/filters/too-many-request/too-many-request-error.filter';
import { UnauthorizedExceptionFilter } from './shared/infra/filters/unauthorized/unauthorized-error.filter';
import { InternalServerExceptionFilter } from './shared/infra/filters/internal-server/internal-server-error.filter';
import { UnprocessableEntityExceptionFilter } from './shared/infra/filters/unprocessable-entity/unprocessable-entity-error.filter';
import { ForbiddenExceptionFilter } from './shared/infra/filters/forbidden/forbidden-error.filter';
import fastifyCors from '@fastify/cors';
import { ValidationPipe } from '@nestjs/common';

export async function globalConfig(
  app: NestFastifyApplication,
  envConfig: EnvConfig,
) {
  app.useGlobalFilters(
    new NotFoundExceptionFilter(),
    new ConflictExceptionFilter(),
    new BadRequestExceptionFilter(),
    new UnauthorizedExceptionFilter(),
    new TooManyRequestExceptionFilter(),
    new InternalServerExceptionFilter(),
    new UnprocessableEntityExceptionFilter(),
    new ForbiddenExceptionFilter(),
  );

  await app.register(fastifyCors, {
    origin: true,
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove propriedades que não estão no DTO
      forbidNonWhitelisted: true, // lança erro se encontrar propriedade não esperada
      transform: true, // transforma payloads em instâncias de classes
    }),
  );
}
