import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleSchema } from './data/typeorm/schema/role.schema';
import { RoleRepositoryMapper } from './data/typeorm/repository/role-mapper';
import { Providers } from 'src/shared/application/constants/providers';
import { RoleRepositoryImpl } from './data/typeorm/repository/role.repository';
import { TenantModule } from 'src/core/tenant/infra/tenant.module';

@Module({
  imports: [TypeOrmModule.forFeature([RoleSchema]), TenantModule],
  controllers: [],
  providers: [
    RoleRepositoryMapper,
    {
      provide: Providers.ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
  ],
  exports: [Providers.ROLE_REPOSITORY, RoleRepositoryMapper],
})
export class RoleModule {}
