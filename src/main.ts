import * as fs from 'fs';
const puppeteerCache = process.env.PUPPETEER_CACHE_DIR || '/tmp/puppeteer';
if (!fs.existsSync(puppeteerCache)) {
  fs.mkdirSync(puppeteerCache, { recursive: true });
}
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
// import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from "@nestjs/common";
import * as express from "express";
import { join } from "path";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = parseInt(process.env.PORT || "3000", 10);

  const config = new DocumentBuilder()
    .setTitle("Startappss HRMS")
    .setDescription("API documentation")
    .setVersion("1.0")
    .addTag("User")
    .addBearerAuth()
    .addSecurityRequirements("bearer")
    .addServer("http://localhost:3000/api")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api/docs", app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
  });

app.enableCors({
  origin: [
    "http://localhost:3001",
    "https://hrms1-kappa.vercel.app",
    "https://hrms1-git-main-ishans-projects-807c29f7.vercel.app",
    "https://hrms1-ba2qsax2z-ishans-projects-807c29f7.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
});


  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  app.use("/uploads", express.static(join(__dirname, "..", "uploads")));
  app.setGlobalPrefix("api");
  app.enableShutdownHooks();

  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();



