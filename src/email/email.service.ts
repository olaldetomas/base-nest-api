import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendEmail(email: string): Promise<void> {
    await this.mailerService.sendMail({
      to: email,
      from: '',
      subject: '',
      text: '',
    });
  }
}
