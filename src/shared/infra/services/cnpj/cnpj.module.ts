import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Providers } from 'src/shared/application/constants/providers';
import { CnpjDataService } from './cnpj.service';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: Providers.CNPJ_SERVICE,
      useFactory: (httpService: HttpService) => {
        new CnpjDataService(httpService);
      },
      inject: [HttpService],
    },
  ],
  exports: [Providers.CNPJ_SERVICE],
})
export class CnpjModule {}
