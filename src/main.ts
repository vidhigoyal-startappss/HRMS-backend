import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const allowedOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:5173');
  const port = process.env.PORT || configService.get<number>('PORT') || 3000;


  app.enableCors({
    origin: allowedOrigin,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true, 
      forbidNonWhitelisted: true, 
    }),
  );
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.enableShutdownHooks();
  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}/api`);
}

bootstrap();