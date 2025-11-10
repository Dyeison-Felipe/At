import { EnvConfig } from 'src/shared/application/env-config/env-config';
import { HashService } from 'src/shared/application/services/hash/hash';
import * as bcrypt from 'bcrypt';

export class HashServiceImpl implements HashService {
  constructor(private readonly envConfig: EnvConfig) {}
  async encryptedPassword(password: string): Promise<string> {
    const salts = this.envConfig.getHashSalts();

    const passwordHashed = await bcrypt.hash(password, salts);

    return passwordHashed;
  }
  async verifyPassword(
    password: string,
    hashPassword: string,
  ): Promise<boolean> {
    const isMatch = await bcrypt.compare(password, hashPassword);

    return isMatch;
  }
}
