import { Body, Controller, Post } from '@nestjs/common';
import { CreateTenantUseCase } from '../../application/usecase/create-tenant.usecase';
import { CreateTenantDto } from '../dto/create-tenant.dto';
import { VerifyCodeEmailUseCase } from '../../application/usecase/verify-code.usecase';
import { VeriryCodeEmailDto } from '../dto/verify-code-email.dto';
import { RegisterTenantPresenter } from './presenter/register-tenant.presenter';

@Controller('v1/tenant')
export class TenantController {
  constructor(
    private readonly createTenantUseCase: CreateTenantUseCase,
    private readonly verifyCodeEmailUseCase: VerifyCodeEmailUseCase,
  ) {}

  @Post()
  async cresteTeanant(
    @Body() tenantDto: CreateTenantDto,
  ): Promise<RegisterTenantPresenter> {
    const register = await this.createTenantUseCase.execute(tenantDto);

    return new RegisterTenantPresenter(register);
  }

  @Post('/verify-code')
  async verifyCodeEmail(@Body() body: VeriryCodeEmailDto) {
    return await this.verifyCodeEmailUseCase.execute(body);
  }
}
