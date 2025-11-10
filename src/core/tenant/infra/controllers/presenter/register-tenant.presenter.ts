import { IsString } from 'class-validator';
import { TenantOutput } from 'src/core/tenant/application/outputs/tenant-output';

export class RegisterTenantPresenter {
  @IsString()
  id: string;

  constructor(output: TenantOutput) {
    this.id = output.id;
  }
}
