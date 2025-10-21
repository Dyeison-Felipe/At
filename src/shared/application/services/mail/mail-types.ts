export type EmailConfig = {
  host: string;
  port: number;
  secure?: boolean;
  user: string;
  pass: string;
};

export type SendEmailData = {
  from: string;
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  cc?: string | string[];
  bcc?: string | string[];
  attachments?: EmailAttachment[];
};

export type EmailAttachment = {
  filename: string;
  path?: string;
  content?: Buffer | string;
  contentType?: string;
};

export type EmailResponse = {
  success: boolean;
  messageId: string;
  response?: string;
};
