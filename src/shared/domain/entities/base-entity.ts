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
      id: props.id ?? crypto.randomUUID().toString(),
      audit: {
        createdAt: props.audit?.createdAt ?? new Date(),
        updatedAt: props.audit?.updatedAt ?? new Date(),
        deletedAt: props.audit?.deletedAt ?? null,
        createdBy: props.audit?.createdBy ?? 'system',
        updatedBy: props.audit?.updatedBy ?? null,
        deletedBy: props.audit?.deletedBy ?? null,
      },
    };
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
