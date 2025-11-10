import { Tenant } from 'src/core/tenant/domain/entities/tenant.entity';
import { Data } from 'src/shared/domain/decorators/data.decorator';
import { BaseEntity } from 'src/shared/domain/entities/base-entity';

type RoleProps = {
  name: string;
  description: string;
  tenant: Tenant;
};

type CreateRoleProps = RoleProps;

export interface Role extends RoleProps {}

@Data()
export class Role extends BaseEntity<RoleProps> {
  static create(props: CreateRoleProps): Role {
    return new Role({
      name: props.name,
      description: props.description,
      tenant: props.tenant,
    });
  }
}
