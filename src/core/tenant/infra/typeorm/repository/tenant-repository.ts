import { InjectRepository } from '@nestjs/typeorm';
import { TenantRepository } from 'src/core/tenant/domain/repository/tenant-repository';
import { TenantSchema } from '../schema/tenant-schema';
import { Repository } from 'typeorm';
import { Tenant } from 'src/core/tenant/domain/entities/tenant.entity';
import { TenantRepositoryMapper } from './mapper/tenant-repositpry-mapper';

export class TenantRepositoryImpl implements TenantRepository {
  constructor(
    @InjectRepository(TenantSchema)
    private readonly tenantRepository: Repository<TenantSchema>,
    private readonly tenantMapper: TenantRepositoryMapper,
  ) {}
  async create(tenant: Tenant): Promise<Tenant> {
    const tenantSchema = this.tenantMapper.toSchema(tenant);

    const saveTenant = await this.tenantRepository.save(tenantSchema);
    const tenantEntity = this.tenantMapper.toEntity(saveTenant);
    return tenantEntity;
  }

  async findByCnpj(cnpj: string): Promise<Tenant | null> {
    const tenantSchema = await this.tenantRepository.findOne({
      where: { cnpj },
    });

    if (!tenantSchema) return null;

    const tenant = this.tenantMapper.toEntity(tenantSchema);

    return tenant;
  }
}
