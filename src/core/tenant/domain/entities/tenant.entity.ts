import { BaseEntity } from 'src/shared/domain/entities/base-entity';
import { Data } from '../../../../shared/domain/decorators/data.decorator';
import { TenantStatusCnpj } from 'src/core/tenant/domain/enums/tenant.enum';
import { Address } from 'src/core/address/domain/entities/address.entity';

export type TenantProps = {
  name: string;
  fantasyName: string;
  cnpj: string;
  stateRegistration: string;
  statusCnpj: TenantStatusCnpj;
  statusAccount: boolean;
  email: string;
  phoneNumber: string;
  checkEmail: boolean;
  codeEmail: string;
  address?: Address;
};

type CreateTenantProps = TenantProps;

export type UpdateTenantProps = Partial<CreateTenantProps>;

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface Tenant extends TenantProps {}

@Data()
export class Tenant extends BaseEntity<TenantProps> {
  static create(props: CreateTenantProps): Tenant {
    return new Tenant({
      name: props.name,
      fantasyName: props.fantasyName,
      cnpj: props.cnpj,
      stateRegistration: props.stateRegistration,
      statusCnpj: props.statusCnpj ?? TenantStatusCnpj.ACTIVE,
      statusAccount: props.statusAccount ?? true,
      email: props.email,
      phoneNumber: props.phoneNumber,
      checkEmail: false,
      codeEmail: props.codeEmail,
      address: props.address,
    });
  }
}
