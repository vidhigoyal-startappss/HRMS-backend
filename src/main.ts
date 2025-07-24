import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = process.env.PORT || configService.get<number>('PORT') || 3000;

  const allowedOrigins = [
    'http://localhost:3001', // 👈 local development
    'https://hrms-frontend-oaun.onrender.com', // 👈 production frontend
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
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