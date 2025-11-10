export interface HashService {
  encryptedPassword(password: string): Promise<string>;
  verifyPassword(password: string, hashPassword: string): Promise<boolean>;
}
