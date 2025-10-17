import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { DatabaseModule } from './shared/infra/database/typeorm/database.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
