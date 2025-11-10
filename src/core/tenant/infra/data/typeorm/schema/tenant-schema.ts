import { AddressSchema } from 'src/core/address/infra/data/typeorm/schema/address.schema';
import { RoleSchema } from 'src/core/roles/infra/data/typeorm/schema/role.schema';
import { TenantStatusCnpj } from 'src/core/tenant/domain/enums/tenant.enum';
import { UserSchema } from 'src/core/user/infra/data/typeorm/schema/user.schema';
import { BaseSchema } from 'src/shared/infra/database/typeorm/schema/base-schema';
import { Column, Entity, JoinColumn, OneToMany, OneToOne } from 'typeorm';

export type TenantSchemaProps = InstanceType<typeof TenantSchema>;

@Entity('tenant')
export class TenantSchema extends BaseSchema {
  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({
    name: 'fantasy_name',
    type: 'varchar',
    length: 255,
    nullable: false,
  })
  fantasyName: string;

  @Column({
    name: 'cnpj',
    type: 'varchar',
    length: 14,
    nullable: false,
    unique: true,
  })
  cnpj: string;

  @Column({
    name: 'state_registration',
    type: 'varchar',
    length: 100,
    nullable: false,
  })
  stateRegistration: string;

  @Column({
    type: 'enum',
    name: 'status_cnpj',
    nullable: false,
    default: TenantStatusCnpj.ACTIVE,
    enum: TenantStatusCnpj,
  })
  statusCnpj: TenantStatusCnpj;

  @Column({
    name: 'status_account',
    type: 'boolean',
    nullable: false,
    default: true,
  })
  statusAccount: boolean;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 255,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    name: 'phone_number',
    type: 'varchar',
    length: 13,
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    name: 'check_email',
    type: 'boolean',
    nullable: false,
    default: false,
  })
  checkEmail: boolean;

  @Column({
    name: 'code_email',
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  codeEmail: string;

  @OneToOne(() => AddressSchema, { cascade: true, eager: true })
  @JoinColumn({ name: 'address_id' })
  address?: AddressSchema;

  @OneToMany(() => RoleSchema, (role) => role.tenant)
  roles: RoleSchema[];

  @OneToMany(() => UserSchema, (user) => user.tenant)
  users: UserSchema[];
}
