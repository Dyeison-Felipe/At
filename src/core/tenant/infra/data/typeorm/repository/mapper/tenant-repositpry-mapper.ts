import { RepositoryMapper } from 'src/shared/domain/repositories/mapper/repository-mapper';
import { TenantSchema } from '../../schema/tenant-schema';
import { Tenant } from 'src/core/tenant/domain/entities/tenant.entity';
import { Injectable } from '@nestjs/common';
import { AddressMapperRepository } from 'src/core/address/infra/data/typeorm/repository/mapper/address-mapper.repository';

@Injectable()
export class TenantRepositoryMapper
  implements RepositoryMapper<TenantSchema, Tenant>
{
  constructor(private readonly addressMapper: AddressMapperRepository) {}

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
      address: this.addressMapper.toEntity(schema.address),
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
      fantasyName: entity.fantasyName,
      cnpj: entity.cnpj,
      stateRegistration: entity.stateRegistration,
      email: entity.email,
      phoneNumber: entity.phoneNumber,
      statusAccount: entity.statusAccount,
      statusCnpj: entity.statusCnpj,
      checkEmail: entity.checkEmail,
      codeEmail: entity.codeEmail,
      address: this.addressMapper.toSchema(entity.address),
      createdAt: entity.audit.createdAt,
      updatedAt: entity.audit.updatedAt,
      deletedAt: entity.audit.deletedAt,
      createdBy: entity.audit.createdBy,
      updatedBy: entity.audit.updatedBy,
      deletedBy: entity.audit.deletedBy,
    });
  }

  toEntityArray(schemas: TenantSchema[]): Tenant[] {
    return schemas.map((schema) => this.toEntity(schema));
  }

  toSchemaArray(entities: Tenant[]): TenantSchema[] {
    return entities.map((entity) => this.toSchema(entity));
  }
}
