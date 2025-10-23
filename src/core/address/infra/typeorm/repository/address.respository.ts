import { InjectRepository } from '@nestjs/typeorm';
import { AddressRepository } from 'src/core/address/domain/repository/address.repository';
import { AddressSchema } from '../schema/address.schema';
import { Repository } from 'typeorm';
import { Address } from 'src/core/address/domain/entities/address.entity';
import { AddressMapperRepository } from './mapper/address-mapper.repository';

export class AddressRepositoryImpl implements AddressRepository {
  constructor(
    @InjectRepository(AddressSchema)
    private readonly addressRepository: Repository<AddressSchema>,
    private readonly addressMapper: AddressMapperRepository,
  ) {}
  async create(entity: Address): Promise<void> {
    const addressSchema = this.addressMapper.toSchema(entity);
    await this.addressRepository.save(addressSchema);
  }

  async findById(id: string): Promise<Address | null> {
    const addressSchema = await this.addressRepository.findOne({
      where: { id },
    });

    if (!addressSchema) return null;

    const addressEntity = this.addressMapper.toEntity(addressSchema);
    return addressEntity;
  }

  async update(entity: Address): Promise<void> {
    const addressSchema = this.addressMapper.toSchema(entity);
    await this.addressRepository.save(addressSchema);
  }

  async hardDelete(id: string): Promise<void> {
    await this.addressRepository.delete({ id });
  }
}
