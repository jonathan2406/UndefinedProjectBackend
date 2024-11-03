import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      secure: false, 
      auth: {
        user: process.env.EMAIL, 
        pass: process.env.EMAIL_PASS, 
      },
    });
  }

  async sendMail(to: string, subject: string, body: string) {
    const info = await this.transporter.sendMail({
      from: `"No Reply" <${process.env.EMAIL}>`, 
      to, 
      subject, 
      text: body, 
    });

    return info;
  }
}