import { Module } from '@nestjs/common';
import { Providers } from 'src/shared/application/constants/providers';
import { HashServiceImpl } from './hash.service';
import { EnvConfigModule } from '../../env-config/env-config.module';

@Module({
  imports: [EnvConfigModule],
  providers: [
    {
      provide: Providers.HASH_SERVICE,
      useClass: HashServiceImpl,
    },
  ],
  exports: [Providers.HASH_SERVICE],
})
export class HashModule {}
