import { Module } from '@nestjs/common';
import { Providers } from 'src/shared/application/constants/providers';
import { NestMailService } from './mail.service';
import { MailerModule, MailerService } from '@nestjs-modules/mailer';
import { EnvConfig } from 'src/shared/application/env-config/env-config';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: (envConfig: EnvConfig) => ({
        transport: {
          host: envConfig.getMailHost(),
          port: envConfig.getMailPort(),
          secure: true,
          auth: {
            user: envConfig.getMailUser(),
            pass: envConfig.getMailPassword(),
          },
        },
      }),
      inject: [Providers.ENV_CONFIG],
    }),
  ],
  providers: [
    {
      provide: Providers.MAIL_SERVICE,
      useFactory: (mailerService: MailerService) => {
        return new NestMailService(mailerService);
      },
      inject: [MailerService],
    },
  ],
  exports: [Providers.MAIL_SERVICE],
})
export class MailModule {}
