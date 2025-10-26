import { RepositoryMapper } from 'src/shared/domain/repositories/mapper/repository-mapper';
import { AddressSchema } from '../../schema/address.schema';
import { Address } from 'src/core/address/domain/entities/address.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AddressMapperRepository
  implements RepositoryMapper<AddressSchema, Address>
{
  toEntity(schema: AddressSchema): Address {
    return Address.with({
      id: schema.id,
      country: schema.country,
      state: schema.state,
      city: schema.city,
      neiborhood: schema.neiborhood,
      street: schema.street,
      number: schema.number,
      zipCode: schema.zipCode,
      complement: schema.complement,
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
  toSchema(entity: Address): AddressSchema {
    return AddressSchema.with({
      id: entity.id,
      country: entity.country,
      state: entity.state,
      city: entity.city,
      neiborhood: entity.neiborhood,
      street: entity.street,
      number: entity.number,
      zipCode: entity.zipCode,
      complement: entity.complement,
      createdAt: entity.audit.createdAt,
      updatedAt: entity.audit.updatedAt,
      deletedAt: entity.audit.deletedAt,
      createdBy: entity.audit.createdBy,
      updatedBy: entity.audit.updatedBy,
      deletedBy: entity.audit.deletedBy,
    });
  }
}
