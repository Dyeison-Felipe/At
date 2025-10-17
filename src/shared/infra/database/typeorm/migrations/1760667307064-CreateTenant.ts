import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTenant1760667307064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(
      new Table({
        name: 'tenants',
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
            name: 'checkEmail',
            type: 'boolean',
            isNullable: false,
            default: false,
          },
          {
            name: 'codeEmail',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'createdAt',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'updatedAt',
            type: 'timestamp with time zone',
            default: 'CURRENT_TIMESTAMP',
            isNullable: false,
          },
          {
            name: 'deletedAt',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'createdBy',
            type: 'varchar',
            isNullable: false,
            default: "'system'",
          },
          {
            name: 'updatedBy',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'deletedBy',
            type: 'varchar',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    // Criar índices para melhor performance
    await queryRunner.query(
      `CREATE INDEX "IDX_tenants_cnpj" ON "tenants" ("cnpj")`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_tenants_email" ON "tenants" ("email")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tenants');
  }
}
