import { randomUUID } from 'crypto';

type Audit = {
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
  createdBy: string;
  updatedBy?: string | null;
  deletedBy?: string | null;
};

type BaseEntityProps = {
  id: string;
  audit: Audit;
};

type ConstructorEntityProps = {
  id?: string;
  audit?: Partial<Audit>;
};

export type BaseProps = Record<string, unknown>;

export abstract class BaseEntity<TProps extends BaseProps> {
  readonly props: TProps & BaseEntityProps;

  constructor(props: TProps & ConstructorEntityProps) {
    this.props = {
      ...props,
      id: randomUUID(),
      audit: {
        createdAt: new Date(),
        updatedAt: new Date(),
        createdBy: 'system',
        updatedBy: null,
        deletedAt: null,
        deletedBy: null,
      },
      // ...props,
    };

    Object.assign(this, props);
  }

  get id() {
    return this.props.id;
  }

  get audit() {
    return this.props.audit;
  }

  protected markAsDeleted() {
    this.audit.deletedAt = new Date();
  }

  protected updateTimestamp() {
    if (this.props.audit) {
      this.props.audit.updatedAt = new Date();
    }
  }

  static with<Props extends BaseProps, Ent extends BaseEntity<Props>>(
    this: new (props: Props & BaseEntityProps) => Ent,
    props: Props & BaseEntityProps,
  ): Ent {
    return new this(props);
  }
}
