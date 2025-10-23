import { Address } from '../entities/address.entity';

export interface AddressRepository {
  create(entity: Address): Promise<void>;
  findById(id: string): Promise<Address | null>;
  update(entity: Address): Promise<void>;
  hardDelete(id: string): Promise<void>;
}
