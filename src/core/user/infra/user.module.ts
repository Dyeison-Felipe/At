import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSchema } from './data/typeorm/schema/user.schema';
import { UserRepositoryMapper } from './data/typeorm/repository/mapper/user-mapper';
import { Providers } from 'src/shared/application/constants/providers';
import { UserRepositoryImpl } from './data/typeorm/repository/user.repository';
import { TenantModule } from 'src/core/tenant/infra/tenant.module';
import { RoleModule } from 'src/core/roles/infra/role.module';
import { CreateUserUseCase } from '../application/usecase/create-user.usecase';
import { UserRepository } from '../domain/repository/user.repository';
import { UnitOfWork } from 'src/shared/application/unit-of-work/unit-of-work';
import { TenantRepository } from 'src/core/tenant/domain/repository/tenant-repository';
import { RoleRepository } from 'src/core/roles/domain/repository/role.repository';
import { HashService } from 'src/shared/application/services/hash/hash';
import { HashModule } from 'src/shared/infra/services/hash/hash.module';
import { UserController } from './controller/user.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserSchema]),
    TenantModule,
    RoleModule,
    HashModule,
  ],
  controllers: [UserController],
  providers: [
    UserRepositoryMapper,
    {
      provide: Providers.USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: CreateUserUseCase,
      useFactory: (
        userRepository: UserRepository,
        uow: UnitOfWork,
        tenantRepositrory: TenantRepository,
        roleRepository: RoleRepository,
        hashService: HashService,
      ) => {
        return new CreateUserUseCase(
          userRepository,
          uow,
          tenantRepositrory,
          roleRepository,
          hashService,
        );
      },
      inject: [
        Providers.USER_REPOSITORY,
        Providers.UNIT_OF_WORK,
        Providers.TENANT_REPOSITORY,
        Providers.ROLE_REPOSITORY,
        Providers.HASH_SERVICE,
      ],
    },
  ],
  exports: [Providers.USER_REPOSITORY, UserRepositoryMapper],
})
export class UserModule {}
