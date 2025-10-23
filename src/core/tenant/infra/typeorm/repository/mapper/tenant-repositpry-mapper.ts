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
      fantasyName: schema.fantasyName,
      cnpj: schema.cnpj,
      stateRegistration: schema.stateRegistration,
      email: schema.email,
      phoneNumber: schema.phoneNumber,
      statusAccount: schema.statusAccount,
      statusCnpj: schema.statusCnpj,
      checkEmail: schema.checkEmail,
      codeEmail: schema.codeEmail,
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
      id: entity.id,
      name: entity.name,
      fantasy_name: entity.fantasyName,
      cnpj: entity.cnpj,
      state_registration: entity.stateRegistration,
      email: entity.email,
      phone_number: entity.phoneNumber,
      status_account: entity.statusAccount,
      status_cnpj: entity.statusCnpj,
      check_email: entity.checkEmail,
      code_email: entity.codeEmail,
      createdAt: entity.audit.createdAt,
      updatedAt: entity.audit.updatedAt,
      deletedAt: entity.audit.deletedAt,
      createdBy: entity.audit.createdBy,
      updatedBy: entity.audit.updatedBy,
      deletedBy: entity.audit.deletedBy,
    });
  }
}
