import { BaseSchema } from 'src/shared/infra/database/typeorm/schema/base-schema';
import { Column, Entity } from 'typeorm';

@Entity('tenants')
export class TenantSchema extends BaseSchema {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  fantasy_name: string;

  @Column({ nullable: false, unique: true })
  cnpj: string;

  @Column({ nullable: false })
  state_registration: string;

  @Column({ type: 'varchar', nullable: false, default: 'active' })
  status_cnpj: 'active' | 'inactive';

  @Column({ nullable: false, default: true })
  status_account: boolean;

  @Column({ nullable: false, unique: true })
  email: string;

  @Column({ nullable: false })
  phone_number: string;

  @Column({ nullable: false, default: false })
  checkEmail: boolean;

  @Column({ nullable: false })
  codeEmail: string;
}
