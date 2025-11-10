import { UnitOfWork } from 'src/shared/application/unit-of-work/unit-of-work';
import { UseCase } from 'src/shared/application/use-case/use-case';
import { TenantRepository } from '../../domain/repository/tenant-repository';
import { NotFoundError } from 'src/shared/application/error/not-found/not-found.error';
import { BadRequestError } from 'src/shared/application/error/bad-request/bad-request.error';

type Input = {
  tenantId: string;
  code: string;
};

type Output = void;

export class VerifyCodeEmailUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly uow: UnitOfWork,
    private readonly tenantRepository: TenantRepository,
  ) {}

  async execute(input: Input): Promise<void> {
    return this.uow.execute(async () => {
      const tenant = await this.tenantRepository.findById(input.tenantId);

      if (!tenant) {
        throw new NotFoundError('Empresa não encontrada.');
      }

      if (tenant.codeEmail !== input.code) {
        throw new BadRequestError('Código inválido.');
      }

      tenant.checkEmail = true;

      await this.tenantRepository.save(tenant);
    });
  }
}
