import { User } from '../entities/user.entity';

export interface UserRepository {
  create(user: User): Promise<User>;
  update(user: User): Promise<User>;
  findOneById(id: string): Promise<User | null>;
  findByTenantId(tenantId: string): Promise<User[] | null>;
  findOndeByEmail(email: string): Promise<User | null>;
}
