import { RepositoryMapper } from 'src/shared/domain/repositories/mapper/repository-mapper';
import { TenantSchema } from '../../schema/tenant-schema';
import { Tenant } from 'src/core/tenant/domain/entities/tenant.entity';

export class TenantRepositoryMapper
  implements RepositoryMapper<TenantSchema, Tenant>
{
  toEntity(schema: TenantSchema): Tenant {
    return Tenant.with({
      id: schema.id,
      name: schema.name,
      fantasy_name: schema.fantasy_name,
      cnpj: schema.cnpj,
      state_registration: schema.state_registration,
      email: schema.email,
      phone_number: schema.phone_number,
      status_account: schema.status_account,
      status_cnpj: schema.status_cnpj,
      check_email: schema.check_email,
      code_email: schema.code_email,
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
  toSchema(entity: Tenant): TenantSchema {
    return TenantSchema.with({
      
    })
  }
}
