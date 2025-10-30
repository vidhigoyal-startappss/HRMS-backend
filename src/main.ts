import * as fs from "fs";
import * as express from "express";
import { join } from "path";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

const puppeteerCache = process.env.PUPPETEER_CACHE_DIR || "/tmp/puppeteer";
if (!fs.existsSync(puppeteerCache))
  fs.mkdirSync(puppeteerCache, { recursive: true });

const lettersDir = "/tmp/letters";
if (!fs.existsSync(lettersDir)) fs.mkdirSync(lettersDir, { recursive: true });

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

  app.use("/uploads/letters", express.static(lettersDir));

  app.setGlobalPrefix("api");
  app.enableShutdownHooks();

  await app.listen(port);
  console.log(`Server running on port ${port}`);
}
bootstrap();
