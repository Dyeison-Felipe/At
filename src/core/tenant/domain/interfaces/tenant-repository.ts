import { Tenant } from '../entities/tenant.entity';

export interface TenantRepository {
  create(tenant: Tenant): Promise<Tenant>;
}
