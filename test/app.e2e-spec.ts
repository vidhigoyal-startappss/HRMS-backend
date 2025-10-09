import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "./../src/app.module";
import * as path from "path";
import { LetterModule } from "../src/letter/letter.module";

describe("AppController (e2e)", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [LetterModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/upload/pdf (POST) should upload a PDF and return URL", async () => {
    const filePath = path.join(__dirname, "sample.pdf"); 

    const res = await request(app.getHttpServer())
      .post("/upload/pdf")
      .attach("file", filePath)
      .expect(201);
    console.log("Uploaded PDF URL:", res.body.url);

    expect(res.body).toHaveProperty("url");
    expect(res.body.url).toMatch(/^https:\/\/res\.cloudinary\.com/);
  });
});
