import { Body, Controller, Post } from '@nestjs/common';
import { CreateTenantUseCase } from '../../application/usecase/create-tenant.usecase';
import { CreateTenantDto } from '../dto/create-tenant.dto';

@Controller('/api/v1/tenant')
export class TenantController {
  constructor(private readonly createTenantUseCase: CreateTenantUseCase) {}

  @Post()
  async cresteTeanant(@Body() tenantDto: CreateTenantDto) {
    return await this.createTenantUseCase.execute(tenantDto);
  }
}
