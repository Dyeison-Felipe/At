import { InjectRepository } from '@nestjs/typeorm';
import { RoleRepository } from 'src/core/roles/domain/repository/role.repository';
import { RoleSchema } from '../schema/role.schema';
import { Repository } from 'typeorm';
import { Role } from 'src/core/roles/domain/entities/role.entity';
import { RoleRepositoryMapper } from './role-mapper';

export class RoleRepositoryImpl implements RoleRepository {
  constructor(
    @InjectRepository(RoleSchema)
    private readonly roleRepository: Repository<RoleSchema>,
    private readonly roleMapper: RoleRepositoryMapper,
  ) {}
  async create(role: Role): Promise<Role> {
    const roleSchema = this.roleMapper.toSchema(role);
    const newRole = await this.roleRepository.save(roleSchema);
    const roleEntity = this.roleMapper.toEntity(newRole);
    return roleEntity;
  }

  async findOneByIdAndTenantId(
    id: string,
    tenantId: string,
  ): Promise<Role | null> {
    const role = await this.roleRepository.findOne({
      where: { id, tenant: { id: tenantId } },
    });

    if (!role) return null;

    const roleEntity = this.roleMapper.toEntity(role);
    return roleEntity;
  }

  async findByTenantId(tenantId: string): Promise<Role[] | null> {
    const rolesSchema = await this.roleRepository.find({
      where: { tenant: { id: tenantId } },
    });

    if (!rolesSchema || rolesSchema.length === 0) return null;

    // Assuming you want to return the first role found for the tenant
    const rolesEntity = this.roleMapper.toEntityArray(rolesSchema);

    return rolesEntity;
  }

  async findOneById(id: string): Promise<Role | null> {
    const roleSchema = await this.roleRepository.findOne({
      where: { id },
    });

    if (!roleSchema) return null;

    const roleEntity = this.roleMapper.toEntity(roleSchema);

    return roleEntity;
  }
}
