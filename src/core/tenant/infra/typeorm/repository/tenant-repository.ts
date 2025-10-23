import { InjectRepository } from '@nestjs/typeorm';
import { TenantRepository } from 'src/core/tenant/domain/repository/tenant-repository';
import { TenantSchema } from '../schema/tenant-schema';
import { Repository } from 'typeorm';
import { Tenant } from 'src/core/tenant/domain/entities/tenant.entity';

export class TenantRepositoryImpl implements TenantRepository {
  constructor(
    @InjectRepository(TenantSchema)
    private readonly tenantRepository: Repository<TenantSchema>,
  ) {}
  async create(tenant: Tenant): Promise<Tenant> {
    throw new Error('Method not implemented.');
  }
}
