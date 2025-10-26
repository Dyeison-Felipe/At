import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateTenant1761487351549 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'tenant',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'fantasy_name',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cnpj',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'state_registration',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'status_cnpj',
            type: 'varchar',
            isNullable: false,
            default: "'active'",
          },
          {
            name: 'status_account',
            type: 'boolean',
            isNullable: false,
            default: true,
          },
          {
            name: 'email',
            type: 'varchar',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'check_email',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'code_email',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'address_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'deleted_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'created_by',
            type: 'varchar',
            isNullable: false,
            default: "'system'",
          },
          {
            name: 'updated_by',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deleted_by',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'tenant',
      new TableForeignKey({
        columnNames: ['address_id'],
        referencedTableName: 'address',
        referencedColumnNames: ['id'],
        onUpdate: 'CASCADE',
      }),
    );

    // Criar índices para melhor performance
    await queryRunner.query(
      `CREATE INDEX "IDX_tenants_cnpj" ON "tenant" ("cnpj")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tenants_email" ON "tenant" ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenant');
  }
}
