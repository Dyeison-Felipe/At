import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PermissionSchema } from './infra/database/typeorm/schema/permission.schema';
import { PermissionRepositoryMapper } from './infra/database/typeorm/repositories/permission/permission-mapper';
import { Providers } from './application/constants/providers';
import { PermissionRepositoryImpl } from './infra/database/typeorm/repositories/permission/permission.repository';

@Module({
  imports: [TypeOrmModule.forFeature([PermissionSchema])],
  providers: [
    PermissionRepositoryMapper,
    {
      provide: Providers.PERMISSION_REPOSITORY,
      useClass: PermissionRepositoryImpl,
    },
  ],

  exports: [Providers.PERMISSION_REPOSITORY, PermissionRepositoryMapper],
})
export class SharedModule {}
