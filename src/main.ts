import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const allowedOrigin = configService.get<string>('CORS_ORIGIN', 'http://localhost:5173');
  const port = configService.get<number>('PORT', 5000);

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

  app.enableShutdownHooks();
  app.setGlobalPrefix('api');

  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}/api`);
}

bootstrap();