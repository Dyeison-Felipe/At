import { OnModuleDestroy } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';
import { InternalServerError } from 'src/shared/application/error/internal-server/internal-server.error';
import { Mail } from 'src/shared/application/services/mail/mail';
import {
  EmailConfig,
  EmailResponse,
  SendEmailData,
} from 'src/shared/application/services/mail/mail-types';

export class MailService implements Mail, OnModuleDestroy {
  private transporters: Map<string, Transporter> = new Map();

  private getTransporterKey(config: EmailConfig): string {
    return `${config.host}:${config.port}:${config.user}`;
  }

  private createTransporter(config: EmailConfig): Transporter {
    return nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: config.secure || false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });
  }

  private getOrCreateTransporter(config: EmailConfig): Transporter {
    const key = this.getTransporterKey(config);

    if (!this.transporters.has(key)) {
      const transporter = this.createTransporter(config);
      this.transporters.set(key, transporter);
    }

    return this.transporters.get(key);
  }

  async sendEmail(
    emailConfig: EmailConfig,
    emailData: SendEmailData,
  ): Promise<EmailResponse> {
    const transporter = this.getOrCreateTransporter(emailConfig);

    try {
      const info = await transporter.sendMail({
        from: emailData.from,
        to: emailData.to,
        subject: emailData.subject,
        text: emailData.text,
        html: emailData.html,
        cc: emailData.cc,
        bcc: emailData.bcc,
        attachments: emailData.attachments,
      });

      return {
        success: true,
        messageId: info.messageId,
        response: info.response,
      };
    } catch (error) {
      throw new InternalServerError(`Falha ao enviar email: ${error.message}`);
    }
  }

  async removeTransporter(config: EmailConfig): Promise<void> {
    const key = this.getTransporterKey(config);

    if (this.transporters.has(key)) {
      const transporter = this.transporters.get(key);
      transporter.close();
      this.transporters.delete(key);
    }
  }

  onModuleDestroy() {
    this.transporters.forEach((transporter) => {
      transporter.close();
    });
    this.transporters.clear();
  }
}
