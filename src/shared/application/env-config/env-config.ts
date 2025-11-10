export interface EnvConfig {
  getHashSalts(): number;
  getPort(): number;
  getDbPort(): number;
  getDbHost(): string;
  getDbUsername(): string;
  getDbPassword(): string;
  getDbName(): string;
  getNodeEnv(): string;
  getMailHost(): string;
  getMailPort(): number;
  getMailUser(): string;
  getMailPassword(): string;
}
