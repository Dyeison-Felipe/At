import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty({ message: 'Username é obrigatório' })
  username: string;

  @IsString()
  @IsNotEmpty({ message: 'Senha é obrigatório' })
  @Length(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, {
    message:
      'A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial (@$!%*?&)',
  })
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'Email é obrigatório' })
  @IsEmail(
    {
      allow_display_name: false,
      require_tld: true,
    },
    { message: 'Email inválido' },
  )
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Código da empresa é obrigatório' })
  tenantId: string;

  @IsString()
  @IsNotEmpty({ message: 'Código da função é obrigatório' })
  roleId: string;
}
