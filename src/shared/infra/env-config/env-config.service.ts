import { ConfigService } from '@nestjs/config';
import { EnvConfig } from 'src/shared/application/env-config/env-config';

export class EnvConfigService implements EnvConfig {
  constructor(private readonly configService: ConfigService) {}
  getMailHost(): string {
    return this.configService.get<string>('EMAIL_HOST') as string;
  }
  getMailPort(): number {
    return +(this.configService.get<string>('MAIL_PORT') as string);
  }
  getMailUser(): string {
    return this.configService.get<string>('MAIL_USER') as string;
  }
  getMailPassword(): string {
    return this.configService.get<string>('MAIL_PASSWORD') as string;
  }
  getPort(): number {
    return +(this.configService.get<string>('PORT') as string);
  }
  getDbPort(): number {
    return +(this.configService.get<string>('DB_PORT') as string);
  }
  getDbHost(): string {
    return this.configService.get<string>('DB_HOST') as string;
  }
  getDbUsername(): string {
    return this.configService.get<string>('DB_USERNAME') as string;
  }
  getDbPassword(): string {
    return this.configService.get<string>('DB_PASSWORD') as string;
  }
  getDbName(): string {
    return this.configService.get<string>('DB_NAME') as string;
  }
  getNodeEnv(): string {
    return this.configService.get<string>('NODE_ENV') as string;
  }
}
