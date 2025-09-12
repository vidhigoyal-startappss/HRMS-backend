import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import * as dotenv from "dotenv";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

export async function uploadPdfToCloudinary(
  buffer: Buffer,
  folder = "signed-pdfs"
): Promise<string> {
  return new Promise((resolve, reject) => {
 const uploadStream = cloudinary.uploader.upload_stream(
  {
    folder,
    resource_type: "raw", 
    type: "upload",
  },
  (error, result) => {
    if (error) return reject(error);
    if (!result?.secure_url) return reject(new Error("No URL returned"));
    resolve(result.secure_url);
  }
);

    uploadStream.write(buffer);
    uploadStream.end();
  });
}

