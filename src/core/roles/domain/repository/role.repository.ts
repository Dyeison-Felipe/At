import { Role } from '../entities/role.entity';

export interface RoleRepository {
  create(role: Role): Promise<Role>;
  findOneByIdAndTenantId(id: string, tenantId: string): Promise<Role | null>;
  findByTenantId(tenantId: string): Promise<Role[] | null>;
  findOneById(id: string): Promise<Role | null>;
}
