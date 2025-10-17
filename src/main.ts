import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Providers } from './shared/application/constants/providers';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { NotFoundExceptionFilter } from './shared/infra/filters/not-found/not-found-error.filter';
import { ConflictExceptionFilter } from './shared/infra/filters/conflict/conflict-error.filter';
import { BadRequestExceptionFilter } from './shared/infra/filters/bad-request/bad-request-error.filter';
import { UnauthorizedExceptionFilter } from './shared/infra/filters/unauthorized/unauthorized-error.filter';
import { TooManyRequestExceptionFilter } from './shared/infra/filters/too-many-request/too-many-request-error.filter';
import { InternalServerExceptionFilter } from './shared/infra/filters/internal-server/internal-server-error.filter';
import { UnprocessableEntityExceptionFilter } from './shared/infra/filters/unprocessable-entity/unprocessable-entity-error.filter';
import { ForbiddenExceptionFilter } from './shared/infra/filters/forbidden/forbidden-error.filter';
import fastifyCors from '@fastify/cors';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  await app.register(fastifyCors, {
    origin: true,
    credentials: true,
  });

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

  const envConfig = app.get(Providers.ENV_CONFIG);

  const port = envConfig.getPort();

  await app.listen(port, '0.0.0.0');
}
bootstrap();
