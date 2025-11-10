import { RepositoryMapper } from 'src/shared/domain/repositories/mapper/repository-mapper';
import { UserSchema } from '../../schema/user.schema';
import { TenantRepositoryMapper } from 'src/core/tenant/infra/data/typeorm/repository/mapper/tenant-repositpry-mapper';
import { RoleRepositoryMapper } from 'src/core/roles/infra/data/typeorm/repository/role-mapper';
import { User } from 'src/core/user/domain/entities/user.entity';

export class UserRepositoryMapper
  implements RepositoryMapper<UserSchema, User>
{
  constructor(
    private readonly tenantMapper: TenantRepositoryMapper,
    private readonly roleMapper: RoleRepositoryMapper,
  ) {}
  toEntity(schema: UserSchema): User {
    return User.with({
      id: schema.id,
      username: schema.username,
      password: schema.password,
      email: schema.email,
      session: schema.session,
      tenant: this.tenantMapper.toEntity(schema.tenant),
      role: this.roleMapper.toEntity(schema.role),
      audit: {
        createdAt: schema.createdAt,
        updatedAt: schema.updatedAt,
        deletedAt: schema.deletedAt,
        createdBy: schema.createdBy,
        updatedBy: schema.updatedBy,
        deletedBy: schema.deletedBy,
      },
    });
  }
  toSchema(entity: User): UserSchema {
    return UserSchema.with({
      id: entity.id,
      username: entity.username,
      password: entity.password,
      email: entity.email,
      session: entity.session,
      tenant: this.tenantMapper.toSchema(entity.tenant),
      role: this.roleMapper.toSchema(entity.role),
      createdAt: entity.audit.createdAt,
      updatedAt: entity.audit.updatedAt,
      deletedAt: entity.audit.deletedAt,
      createdBy: entity.audit.createdBy,
      updatedBy: entity.audit.updatedBy,
      deletedBy: entity.audit.deletedBy,
    });
  }
  toEntityArray(schemas: UserSchema[]): User[] {
    return schemas.map((schema) => this.toEntity(schema));
  }
  toSchemaArray(entities: User[]): UserSchema[] {
    return entities.map((entity) => this.toSchema(entity));
  }
}
