import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const usedPort = 3000;
  console.log('Start Me Up Project is running on port %s', usedPort);
}
bootstrap();