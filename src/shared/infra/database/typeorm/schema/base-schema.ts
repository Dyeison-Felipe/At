import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export type SchemaBaseProps = Record<string, unknown>;

export type SchemaProps = Partial<InstanceType<typeof BaseSchema>>;

export abstract class BaseSchema {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp with time zone',
    nullable: true,
  })
  deletedAt?: Date | null;

  @Column({ name: 'created_by', nullable: false, default: 'system' })
  createdBy: string;

  @Column({ name: 'updated_by', nullable: true })
  updatedBy?: string;

  @Column({ name: 'deleted_by', nullable: true })
  deletedBy?: string | null;

  static with<Props extends SchemaBaseProps, Ent extends BaseSchema>(
    this: new (props: Props & SchemaProps) => Ent,
    props: Props & SchemaProps,
  ): Ent {
    const schemaInstance = new this(props);
    Object.assign(schemaInstance, props);
    return schemaInstance;
  }
}
