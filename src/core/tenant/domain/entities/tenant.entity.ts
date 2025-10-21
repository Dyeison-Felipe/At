import { BaseEntity } from 'src/shared/domain/entities/base-entity';
import { Data } from '../../../../shared/domain/decorators/data.decorator';

export type TenantProps = {
  name: string;
  fantasy_name: string;
  cnpj: string;
  state_registration: string;
  status_cnpj: 'active' | 'inactive';
  status_account: boolean;
  email: string;
  phone_number: string;
  check_email: boolean;
  code_email: string;
};

type CreateTenantProps = TenantProps;

export type UpdateTenantProps = Partial<CreateTenantProps>;

@Data()
export class Tenant extends BaseEntity<TenantProps> {
  static create(props: CreateTenantProps): Tenant {
    return new Tenant({
      name: props.name,
      fantasy_name: props.fantasy_name,
      cnpj: props.cnpj,
      state_registration: props.state_registration,
      status_cnpj: props.status_cnpj ?? 'active',
      status_account: props.status_account ?? true,
      email: props.email,
      phone_number: props.phone_number,
      check_email: false,
      code_email: props.code_email,
    });
  }
}
