import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { DatabaseModule } from './shared/infra/database/typeorm/database.module';
import { TenantModule } from './core/tenant/infra/tenant.module';

@Module({
  imports: [EnvConfigModule, DatabaseModule, TenantModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
