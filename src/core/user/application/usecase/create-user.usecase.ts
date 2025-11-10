import { UseCase } from 'src/shared/application/use-case/use-case';
import { CreateUserOutput } from '../outputs/create-user.output';
import { UserRepository } from '../../domain/repository/user.repository';
import { UnitOfWork } from 'src/shared/application/unit-of-work/unit-of-work';
import { TenantRepository } from 'src/core/tenant/domain/repository/tenant-repository';
import { RoleRepository } from 'src/core/roles/domain/repository/role.repository';
import { NotFoundError } from 'src/shared/application/error/not-found/not-found.error';
import { ConflictError } from 'src/shared/application/error/conflict/conflict-error';
import { HashService } from 'src/shared/application/services/hash/hash';
import { User } from '../../domain/entities/user.entity';
import { BadRequestError } from 'src/shared/application/error/bad-request/bad-request.error';

type Input = {
  username: string;
  password: string;
  email: string;
  tenantId: string;
  roleId: string;
};

type Output = CreateUserOutput;

export class CreateUserUseCase implements UseCase<Input, Output> {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly uow: UnitOfWork,
    private readonly tenantRepositrory: TenantRepository,
    private readonly roleRepository: RoleRepository,
    private readonly hashService: HashService,
  ) {}
  async execute(input: Input): Promise<Output> {
    return this.uow.execute(async () => {
      const tenant = await this.tenantRepositrory.findById(input.tenantId);
      if (!tenant) {
        throw new NotFoundError(`Empresa não encontrada`);
      }

      const role = await this.roleRepository.findOneById(input.roleId);

      if (!role) {
        throw new NotFoundError(`Função não encontrada`);
      }

      const existEmail = await this.userRepository.findOndeByEmail(input.email);

      if (existEmail) {
        throw new ConflictError(
          `Já existe um usuário cadastrado com esse email`,
        );
      }

      const passwordHashed = await this.hashService.encryptedPassword(
        input.password,
      );

      const createUser = User.create({
        username: input.username,
        password: passwordHashed,
        email: input.email,
        session: null,
        role: role,
        tenant: tenant,
      });

      const newUser = await this.userRepository.create(createUser);

      if (!newUser) {
        throw new BadRequestError(`Ocorreu um erro ao criar o usuário`);
      }

      const output: Output = {
        id: newUser.id,
        email: newUser.email,
        session: newUser.session,
        role: {
          id: newUser.role.id,
          name: newUser.role.name,
        },
        tenant: {
          id: newUser.tenant.id,
          name: newUser.tenant.name,
        },
      };

      return output;
    });
  }
}
