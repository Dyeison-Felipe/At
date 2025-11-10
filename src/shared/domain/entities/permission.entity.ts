import { BaseEntity } from 'src/shared/domain/entities/base-entity';
import { Data } from 'src/shared/domain/decorators/data.decorator';
import { PermissionsEnum } from 'src/shared/application/enums/permission.enum';

type PermissionProps = {
  permission: PermissionsEnum;
  description: string;
};

type CreatePermission = PermissionProps;

export interface Permission extends PermissionProps {}

@Data()
export class Permission extends BaseEntity<PermissionProps> {
  static create(props: CreatePermission): Permission {
    return new Permission({
      permission: props.permission,
      description: props.description,
    });
  }
}
