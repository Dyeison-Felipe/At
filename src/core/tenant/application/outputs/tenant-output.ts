import { AddressOutput } from 'src/core/address/application/outputs/address-output';
import { TenantStatusCnpj } from '../../domain/enums/tenant.enum';

export type TenantOutput = {
  id: string;
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
  address: AddressOutput;
};
