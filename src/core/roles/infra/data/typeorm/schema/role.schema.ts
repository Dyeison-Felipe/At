import { TenantSchema } from 'src/core/tenant/infra/data/typeorm/schema/tenant-schema';
import { UserSchema } from 'src/core/user/infra/data/typeorm/schema/user.schema';
import { BaseSchema } from 'src/shared/infra/database/typeorm/schema/base-schema';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Entity('role')
@Index(['tenant', 'name'], { unique: true })
export class RoleSchema extends BaseSchema {
  @Column({ name: 'name', type: 'varchar', nullable: false, length: 30 })
  name: string;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: false,
    length: 255,
  })
  description: string;

  @ManyToOne(() => TenantSchema, (tenant) => tenant.roles)
  @JoinColumn({ name: 'tenant_id' })
  tenant: TenantSchema;

  @ManyToOne(() => UserSchema, (user) => user.role)
  user: UserSchema[];
}
