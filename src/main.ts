import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Providers } from './shared/application/constants/providers';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import {
  initializeTransactionalContext,
  StorageDriver,
} from 'typeorm-transactional';
import { globalConfig } from './global-config';

async function bootstrap() {
  // Config transactions
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const envConfig = app.get(Providers.ENV_CONFIG);

  await globalConfig(app, envConfig);

  const port = envConfig.getPort();

  await app.listen(port, '0.0.0.0');
}
bootstrap();
