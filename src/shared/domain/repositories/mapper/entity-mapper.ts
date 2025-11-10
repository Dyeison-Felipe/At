import { BaseEntity, BaseProps } from '../../entities/base-entity';

export interface RepositoryEntityMapper<
  Schema,
  E extends BaseEntity<BaseProps>,
> {
  toEntity(schema: Schema): E;
  toEntityArray(schemas: Schema[]): E[];
}
