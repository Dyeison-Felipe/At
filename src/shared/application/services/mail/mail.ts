import { EmailConfig, EmailResponse, SendEmailData } from './mail-types';

export interface Mail {
  sendEmail(
    emailConfig: EmailConfig,
    emailData: SendEmailData,
  ): Promise<EmailResponse>;

  removeTransporter(config: EmailConfig): Promise<void>;
}
