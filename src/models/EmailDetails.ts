export interface EmailDetails {
  to: string[];
  subject: string;
  textBody?: string;
  htmlBody?: string;
}
