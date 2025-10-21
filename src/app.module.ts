import { Module } from '@nestjs/common';
import { EnvConfigModule } from './shared/infra/env-config/env-config.module';
import { DatabaseModule } from './shared/infra/database/typeorm/database.module';
import { TenantModule } from './core/tenant/infra/tenant.module';
import { CnpjModule } from './shared/infra/services/cnpj/cnpj.module';
import { MailModule } from './shared/infra/services/mail/mail.module';

@Module({
  imports: [
    EnvConfigModule,
    DatabaseModule,
    TenantModule,
    CnpjModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
