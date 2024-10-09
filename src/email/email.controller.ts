import { Controller, Post, Body } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendMail(@Body() mailData: { to: string; subject: string; body: string }) {
    await this.emailService.sendMail(mailData.to, mailData.subject, mailData.body);
    return { message: 'Email sent successfully!' };
  }
}
