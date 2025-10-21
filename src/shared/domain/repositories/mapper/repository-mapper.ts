import { BaseEntity, BaseProps } from '../../entities/base-entity';
import { RepositoryEntityMapper } from './entity-mapper';
import { RepositorySchemaMapper } from './schema-mapper';

export interface RepositoryMapper<Schema, E extends BaseEntity<BaseProps>>
  extends RepositoryEntityMapper<Schema, E>,
    RepositorySchemaMapper<Schema, E> {}
