import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS (adjust origin as needed)
  app.enableCors({
    origin: 'http://localhost:3001', // your React app origin
    credentials: true,
  });

  // Add global validation pipe for DTO validation & transformation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // strip unknown properties
    forbidNonWhitelisted: true, // throw error if unknown props found
    transform: true, // transform payload to DTO class instances
  }));

  await app.listen(3000);
}
bootstrap();
