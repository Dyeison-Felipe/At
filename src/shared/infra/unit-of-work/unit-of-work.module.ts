import { Global, Module } from '@nestjs/common';
import { Providers } from 'src/shared/application/constants/providers';
import { UnitOfWorkService } from './unit-of-work.service';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: Providers.UNIT_OF_WORK,
      useFactory: () => {
        return new UnitOfWorkService();
      },
      inject: [],
    },
  ],
  exports: [Providers.UNIT_OF_WORK],
})
export class UnitOfWorkModule {}
