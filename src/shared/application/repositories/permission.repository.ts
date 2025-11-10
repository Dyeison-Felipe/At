import { Permission } from 'src/shared/domain/entities/permission.entity';

export interface PermissionRepository {
  findByPermissionId(permissionId: string): Promise<Permission | null>;
}
