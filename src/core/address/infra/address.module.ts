import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressSchema } from './typeorm/schema/address.schema';
import { AddressMapperRepository } from './typeorm/repository/mapper/address-mapper.repository';
import { Providers } from 'src/shared/application/constants/providers';
import { AddressRepositoryImpl } from './typeorm/repository/address.respository';

@Module({
  imports: [TypeOrmModule.forFeature([AddressSchema])],
  providers: [
    AddressMapperRepository,
    {
      provide: Providers.ADDRESS_REPOSITORY,
      useClass: AddressRepositoryImpl,
    },
  ],
  exports: [Providers.ADDRESS_REPOSITORY],
})
export class AddressModule {}
