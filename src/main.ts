// src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimiterMiddleware } from './middleware/rateLimiter.middleware';
import { SecurityMiddleware } from './middleware/security.middleware';
import { Logger } from '@nestjs/common';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], 
  });
  app.enableCors({
    origin: ["http://localhost:3000"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: false,
  });
  app.use(morgan('combined'));

  app.use(new RateLimiterMiddleware().use);
  app.use(new SecurityMiddleware().use);

  await app.listen(3000);
  Logger.log('Application is running on: http://localhost:3000');
}
bootstrap();