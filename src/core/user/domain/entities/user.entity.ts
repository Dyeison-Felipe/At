import { Role } from 'src/core/roles/domain/entities/role.entity';
import { Tenant } from 'src/core/tenant/domain/entities/tenant.entity';
import { Data } from 'src/shared/domain/decorators/data.decorator';
import { BaseEntity } from 'src/shared/domain/entities/base-entity';

type UserProps = {
  username: string;
  password: string;
  session: string | null;
  email: string;
  tenant: Tenant;
  role: Role;
};

type CreateUserProps = UserProps;

export interface User extends UserProps {}

@Data()
export class User extends BaseEntity<UserProps> {
  static create(props: CreateUserProps): User {
    return new User({
      username: props.username,
      password: props.password,
      session: props.session || null,
      email: props.email,
      tenant: props.tenant,
      role: props.role,
    });
  }
}
