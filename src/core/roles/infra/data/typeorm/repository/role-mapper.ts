import { RepositoryMapper } from 'src/shared/domain/repositories/mapper/repository-mapper';
import { RoleSchema } from '../schema/role.schema';
import { Role } from 'src/core/roles/domain/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { TenantRepositoryMapper } from 'src/core/tenant/infra/data/typeorm/repository/mapper/tenant-repositpry-mapper';

@Injectable()
export class RoleRepositoryMapper
  implements RepositoryMapper<RoleSchema, Role>
{
  constructor(private readonly tenantMapper: TenantRepositoryMapper) {}

  toEntity(schema: RoleSchema): Role {
    return Role.with({
      id: schema.id,
      name: schema.name,
      description: schema.description,
      tenant: this.tenantMapper.toEntity(schema.tenant),
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

  toSchema(entity: Role): RoleSchema {
    return RoleSchema.with({
      id: entity.id,
      name: entity.name,
      description: entity.description,
      tenant: this.tenantMapper.toSchema(entity.tenant),
      createdAt: entity.audit.createdAt,
      updatedAt: entity.audit.updatedAt,
      deletedAt: entity.audit.deletedAt,
      createdBy: entity.audit.createdBy,
      updatedBy: entity.audit.updatedBy,
      deletedBy: entity.audit.deletedBy,
    });
  }

  toEntityArray(schemas: RoleSchema[]): Role[] {
    return schemas.map((schema) => this.toEntity(schema));
  }

  toSchemaArray(entities: Role[]): RoleSchema[] {
    return entities.map((entity) => this.toSchema(entity));
  }
}
