import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { EmailService } from './email.service';
import { Response } from 'express';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendMail(@Body() mailData: { to: string; subject: string; body: string }, @Res() res: Response) {
    try {
      await this.emailService.sendMail(mailData.to, mailData.subject, mailData.body);
      return res.status(HttpStatus.OK).json({
        message: 'Email sent successfully!',
      });
    } catch (error) {
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send(error.message);
    }
  }
}
