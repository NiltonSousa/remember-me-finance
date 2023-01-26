export interface EmailTransporterModel {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  tls: { rejectUnauthorized: false };
}

export interface SendEmailOptionsModel {
  from: string;
  to: string;
  subject: string;
  text: string;
}
