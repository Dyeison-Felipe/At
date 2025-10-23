import { BaseSchema } from 'src/shared/infra/database/typeorm/schema/base-schema';
import { Column, Entity } from 'typeorm';

@Entity('address')
export class AddressSchema extends BaseSchema {
  @Column({ name: 'country', nullable: false, type: 'varchar', length: 100 })
  country: string;

  @Column({ name: 'state', nullable: false, type: 'varchar', length: 255 })
  state: string;

  @Column({ name: 'city', nullable: false, type: 'varchar', length: 255 })
  city: string;

  @Column({ name: 'neiborhood', nullable: false, type: 'varchar', length: 255 })
  neiborhood: string;

  @Column({ name: 'street', nullable: false, type: 'varchar', length: 255 })
  street: string;

  @Column({ name: 'number', nullable: false, type: 'varchar', length: 10 })
  number: string;

  @Column({ name: 'zip_code', nullable: false, type: 'varchar', length: 8 })
  zipCode: string;

  @Column({ name: 'complement', nullable: false, type: 'varchar', length: 255 })
  complement: string;
}
