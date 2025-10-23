import { Data } from 'src/shared/domain/decorators/data.decorator';
import { BaseEntity } from 'src/shared/domain/entities/base-entity';

export type AddressProps = {
  country: string;
  state: string;
  city: string;
  neiborhood: string;
  street: string;
  number: string;
  zipCode: string;
  complement: string;
};

type CreateAddressProps = AddressProps;

export interface Address extends AddressProps {}

@Data()
export class Address extends BaseEntity<AddressProps> {
  static create(props: CreateAddressProps): Address {
    return new Address({
      country: props.country,
      state: props.state,
      city: props.city,
      neiborhood: props.neiborhood,
      street: props.street,
      number: props.number,
      zipCode: props.zipCode,
      complement: props.complement,
    });
  }

  deleteAddress(): void {
    this.markAsDeleted();
    this.updateTimestamp();
  }
}
