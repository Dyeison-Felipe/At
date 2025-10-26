import { IsString } from 'class-validator';

export class CreateAddressDto {
  @IsString()
  country: string;
  @IsString()
  state: string;
  @IsString()
  city: string;
  @IsString()
  neiborhood: string;
  @IsString()
  street: string;
  @IsString()
  number: string;
  @IsString()
  zipCode: string;
  @IsString()
  complement: string;
}
