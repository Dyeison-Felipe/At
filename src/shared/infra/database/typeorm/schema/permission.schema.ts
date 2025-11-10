import { PermissionsEnum } from 'src/shared/application/enums/permission.enum';
import { BaseSchema } from 'src/shared/infra/database/typeorm/schema/base-schema';
import { Column, Entity } from 'typeorm';

@Entity('permission')
export class PermissionSchema extends BaseSchema {
  @Column({
    name: 'permission',
    type: 'enum',
    nullable: false,
    length: 15,
    enum: PermissionsEnum,
  })
  permission: PermissionsEnum;

  @Column({ name: 'descroption', type: 'varchar', nullable: false })
  description: string;
}
