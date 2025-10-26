import { MailerService } from '@nestjs-modules/mailer';
import {
  MailOptions,
  MailService,
} from 'src/shared/application/services/mail/mail';

export class NestMailService implements MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendMail(mailOptions: MailOptions): Promise<void> {
    await this.mailerService.sendMail({
      to: mailOptions.to,
      html: mailOptions.content,
      subject: mailOptions.subject,
    });
  }
}
