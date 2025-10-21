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
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'timestamp with time zone', nullable: true })
  deletedAt?: Date | null;

  @Column({ nullable: false, default: 'system' })
  createdBy: string;

  @Column({ nullable: true })
  updatedBy?: string;

  @Column({ nullable: true })
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
