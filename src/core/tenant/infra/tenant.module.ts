import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantSchema } from './typeorm/schema/tenant-schema';
import { TenantRepositoryMapper } from './typeorm/repository/mapper/tenant-repositpry-mapper';
import { Providers } from 'src/shared/application/constants/providers';
import { TenantRepositoryImpl } from './typeorm/repository/tenant-repository';
import { AddressModule } from 'src/core/address/infra/address.module';
import { CreateTenantUseCase } from '../application/usecase/create-tenant.usecase';
import { AddressRepository } from 'src/core/address/domain/repository/address.repository';
import { Cnpj } from 'src/shared/application/services/cnpj/cnpj';
import { MailService } from 'src/shared/application/services/mail/mail';
import { CnpjModule } from 'src/shared/infra/services/cnpj/cnpj.module';
import { MailModule } from 'src/shared/infra/services/mail/mail.module';
import { UnitOfWork } from 'src/shared/application/unit-of-work/unit-of-work';
import { UnitOfWorkModule } from 'src/shared/infra/unit-of-work/unit-of-work.module';
import { TenantController } from './controllers/tenant.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([TenantSchema]),
    AddressModule,
    CnpjModule,
    MailModule,
    UnitOfWorkModule,
  ],
  controllers: [TenantController],
  providers: [
    TenantRepositoryMapper,
    {
      provide: Providers.TENANT_REPOSITORY,
      useClass: TenantRepositoryImpl,
    },
    {
      provide: CreateTenantUseCase,
      useFactory: (
        tenantRepository: TenantRepositoryImpl,
        addressRepository: AddressRepository,
        cnpjService: Cnpj,
        mailService: MailService,
        uow: UnitOfWork,
      ) => {
        return new CreateTenantUseCase(
          tenantRepository,
          addressRepository,
          cnpjService,
          mailService,
          uow,
        );
      },
      inject: [
        Providers.TENANT_REPOSITORY,
        Providers.ADDRESS_REPOSITORY,
        Providers.CNPJ_SERVICE,
        Providers.MAIL_SERVICE,
        Providers.UNIT_OF_WORK,
      ],
    },
  ],
  exports: [Providers.TENANT_REPOSITORY],
})
export class TenantModule {}
