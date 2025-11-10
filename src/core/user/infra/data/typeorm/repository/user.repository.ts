import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/core/user/domain/repository/user.repository';
import { UserSchema } from '../schema/user.schema';
import { Repository } from 'typeorm';
import { User } from 'src/core/user/domain/entities/user.entity';
import { UserRepositoryMapper } from './mapper/user-mapper';

export class UserRepositoryImpl implements UserRepository {
  constructor(
    @InjectRepository(UserSchema)
    private readonly userRepository: Repository<UserSchema>,
    private readonly userMapper: UserRepositoryMapper,
  ) {}

  async create(user: User): Promise<User> {
    const userSchema = this.userMapper.toSchema(user);

    const newUser = await this.userRepository.save(userSchema);

    const userEntity = this.userMapper.toEntity(newUser);
    return userEntity;
  }

  async update(user: User): Promise<User> {
    const userSchema = this.userMapper.toSchema(user);

    const updateUser = await this.userRepository.save(userSchema);

    const userEntity = this.userMapper.toEntity(updateUser);
    return userEntity;
  }

  async findOneById(id: string): Promise<User | null> {
    const userSchema = await this.userRepository.findOne({
      where: { id },
      relations: ['tenant'],
    });

    if (!userSchema) return null;

    const userEntity = this.userMapper.toEntity(userSchema);

    return userEntity;
  }

  async findByTenantId(tenantId: string): Promise<User[] | null> {
    const userSchema = await this.userRepository.find({
      where: { tenant: { id: tenantId } },
      relations: ['tenant'],
    });

    if (!userSchema || userSchema.length === 0) return null;

    const userEntity = this.userMapper.toEntityArray(userSchema);

    return userEntity;
  }

  async findOndeByEmail(email: string): Promise<User | null> {
    const userSchema = await this.userRepository.findOne({
      where: { email },
    });

    if (!userSchema) return null;

    const userEntity = this.userMapper.toEntity(userSchema);

    return userEntity;
  }
}
