import { InjectRepository } from '@nestjs/typeorm';
import { PermissionRepository } from 'src/shared/application/repositories/permission.repository';
import { PermissionSchema } from '../../schema/permission.schema';
import { Repository } from 'typeorm';
import { Permission } from 'src/shared/domain/entities/permission.entity';
import { PermissionRepositoryMapper } from './permission-mapper';

export class PermissionRepositoryImpl implements PermissionRepository {
  constructor(
    @InjectRepository(PermissionSchema)
    private readonly permissionRepository: Repository<PermissionSchema>,
    private readonly permissionMapper: PermissionRepositoryMapper,
  ) {}

  async findByPermissionId(permissionId: string): Promise<Permission | null> {
    const permission = await this.permissionRepository.findOne({
      where: { id: permissionId },
    });

    if (!permission) return null;

    const permissionEntity = this.permissionMapper.toEntity(permission);

    return permissionEntity;
  }
}
