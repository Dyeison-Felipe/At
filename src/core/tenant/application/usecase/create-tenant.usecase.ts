import { UseCase } from 'src/shared/application/use-case/use-case';
import { TenantRepository } from '../../domain/repository/tenant-repository';
import { AddressRepository } from 'src/core/address/domain/repository/address.repository';
import { BadRequestError } from 'src/shared/application/error/bad-request/bad-request.error';
import { Address } from 'src/core/address/domain/entities/address.entity';
import { Tenant } from '../../domain/entities/tenant.entity';
import { MailService } from 'src/shared/application/services/mail/mail';
import { Cnpj } from 'src/shared/application/services/cnpj/cnpj';
import { UnitOfWork } from 'src/shared/application/unit-of-work/unit-of-work';
import { TenantOutput } from '../outputs/tenant-output';
import { TenantStatusCnpj } from '../../domain/enums/tenant.enum';

type Input = {
  name: string;
  fantasyName: string;
  cnpj: string;
  stateRegistration: string;
  email: string;
  phoneNumber: string;

  // Address
  address: {
    country: string;
    state: string;
    city: string;
    neiborhood: string;
    street: string;
    number: string;
    zipCode: string;
    complement?: string;
  };
};

type Output = TenantOutput;

export class CreateTenantUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly tenantRepository: TenantRepository,
    private readonly addressRepository: AddressRepository,
    private readonly cnpjService: Cnpj,
    private readonly mailService: MailService,
    private readonly uow: UnitOfWork,
  ) {}

  async execute(input: Input): Promise<Output> {
    return this.uow.execute(async () => {
      const existingTenant = await this.tenantRepository.findByCnpj(input.cnpj);

      if (existingTenant) {
        throw new BadRequestError(
          'Já existe uma empresa cadastrada com este CNPJ.',
        );
      }

      const newCnpj = this.validateCnpj(input.cnpj);

      const cnpjVerify = await this.cnpjService.findDataCnpj(newCnpj);

      if (cnpjVerify.nome.toLowerCase() !== input.name.toLowerCase()) {
        throw new BadRequestError(
          'O nome da razão social da empresa não corresponde ao nome do CNPJ fornecido.',
        );
      }

      if (cnpjVerify.situacao !== 'ATIVA') {
        throw new BadRequestError('O CNPJ fornecido não está ativo.');
      }

      const newAddress = Address.create({
        country: input.address.country,
        state: input.address.state,
        city: input.address.city,
        neiborhood: input.address.neiborhood,
        street: input.address.street,
        number: input.address.number,
        zipCode: input.address.zipCode,
        complement: input.address.complement,
      });

      const createdAddress = await this.addressRepository.create(newAddress);

      if (!createdAddress) {
        throw new BadRequestError('Erro ao criar o endereço.');
      }

      const codeEmail = this.generateCodeEmail();

      const tenant = Tenant.create({
        name: input.name,
        fantasyName: input.fantasyName,
        cnpj: newCnpj,
        stateRegistration: input.stateRegistration,
        statusCnpj:
          cnpjVerify.situacao === 'ATIVA'
            ? TenantStatusCnpj.ACTIVE
            : TenantStatusCnpj.INACTIVE,
        email: input.email,
        phoneNumber: input.phoneNumber,
        checkEmail: false,
        codeEmail: codeEmail,
        statusAccount: false,
        address: createdAddress,
      });

      const createdTenant = await this.tenantRepository.create(tenant);

      if (!createdTenant) {
        throw new BadRequestError('Erro ao criar conta.');
      }

      await this.mailService.sendMail({
        to: input.email,
        subject: 'Código de verificação de e-mail',
        content: `Seu código de verificação é: ${codeEmail}`,
      });

      const output: Output = {
        id: createdTenant.id,
        name: createdTenant.name,
        fantasyName: createdTenant.fantasyName,
        cnpj: createdTenant.cnpj,
        stateRegistration: createdTenant.stateRegistration,
        statusCnpj: createdTenant.statusCnpj,
        statusAccount: createdTenant.statusAccount,
        email: createdTenant.email,
        phoneNumber: createdTenant.phoneNumber,
        checkEmail: createdTenant.checkEmail,
        codeEmail: createdTenant.codeEmail,
        address: {
          country: createdTenant.address.country,
          state: createdTenant.address.state,
          city: createdTenant.address.city,
          neiborhood: createdTenant.address.neiborhood,
          street: createdTenant.address.street,
          number: createdTenant.address.number,
          zipCode: createdTenant.address.zipCode,
          complement: createdTenant.address.complement,
        },
      };

      return output;
    });
  }

  validateCnpj(cnpj: string): string {
    const cnpjClean = cnpj.replace(/[^\d]+/g, '');

    if (cnpjClean.length !== 14) {
      throw new BadRequestError('CNPJ inválido');
    }

    return cnpjClean;
  }

  generateCodeEmail(): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    return code;
  }
}
