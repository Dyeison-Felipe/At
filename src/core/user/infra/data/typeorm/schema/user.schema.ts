import { RoleSchema } from 'src/core/roles/infra/data/typeorm/schema/role.schema';
import { TenantSchema } from 'src/core/tenant/infra/data/typeorm/schema/tenant-schema';
import { BaseSchema } from 'src/shared/infra/database/typeorm/schema/base-schema';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('user')
export class UserSchema extends BaseSchema {
  @Column({ name: 'username', type: 'varchar', nullable: false, length: 30 })
  username: string;

  @Column({ name: 'password', type: 'varchar', nullable: false, length: 255 })
  password: string;

  @Column({ name: 'session', type: 'varchar', nullable: false, length: 255 })
  session: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, length: 255 })
  email: string;

  @ManyToOne(() => TenantSchema, (tenant) => tenant.users)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantSchema;

  @ManyToOne(() => RoleSchema, (role) => role.user)
  role: RoleSchema;
}
