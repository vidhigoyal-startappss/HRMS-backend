import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Proper CORS configuration
  app.enableCors({
    origin: 'http://localhost:3000', // frontend URL
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // if using cookies or auth headers
  });

  app.setGlobalPrefix('api');
  await app.listen(3001);
}
bootstrap();
