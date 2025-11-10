import { RepositoryMapper } from 'src/shared/domain/repositories/mapper/repository-mapper';
import { PermissionSchema } from '../../schema/permission.schema';
import { Permission } from 'src/shared/domain/entities/permission.entity';

export class PermissionRepositoryMapper
  implements RepositoryMapper<PermissionSchema, Permission>
{
  toEntity(schema: PermissionSchema): Permission {
    return Permission.with({
      id: schema.id,
      permission: schema.permission,
      description: schema.description,
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

  toSchema(entity: Permission): PermissionSchema {
    return PermissionSchema.with({
      id: entity.id,
      permission: entity.permission,
      description: entity.description,
      createdAt: entity.audit.createdAt,
      updatedAt: entity.audit.updatedAt,
      deletedAt: entity.audit.deletedAt,
      createdBy: entity.audit.createdBy,
      updatedBy: entity.audit.updatedBy,
      deletedBy: entity.audit.deletedBy,
    });
  }
  toEntityArray(schemas: PermissionSchema[]): Permission[] {
    return schemas.map((schema) => this.toEntity(schema));
  }

  toSchemaArray(entities: Permission[]): PermissionSchema[] {
    return entities.map((entity) => this.toSchema(entity));
  }
}
