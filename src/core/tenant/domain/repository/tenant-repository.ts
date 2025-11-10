import { Tenant } from '../entities/tenant.entity';

export interface TenantRepository {
  save(tenant: Tenant): Promise<Tenant>;
  findByCnpj(cnpj: string): Promise<Tenant | null>;
  findById(id: string): Promise<Tenant | null>;
}
