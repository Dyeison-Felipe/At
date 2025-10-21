import { Module } from '@nestjs/common';
import { Providers } from 'src/shared/application/constants/providers';
import { MailService } from './mail.service';

@Module({
  imports: [],
  providers: [
    {
      provide: Providers.MAIL_SERVICE,
      useFactory: () => {
        return new MailService();
      },
      inject: [],
    },
  ],
  exports: [Providers.MAIL_SERVICE],
})
export class MailModule {}
