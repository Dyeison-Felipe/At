export interface RepositorySchemaMapper<Schema, E> {
  toSchema(entity: E): Schema;
  toSchemaArray(entities: E[]): Schema[];
}
