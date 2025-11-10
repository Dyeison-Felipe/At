import { IsString, Length } from 'class-validator';

export class VeriryCodeEmailDto {
  @IsString()
  tenantId: string;

  @IsString()
  @Length(6, 6)
  code: string;
}
