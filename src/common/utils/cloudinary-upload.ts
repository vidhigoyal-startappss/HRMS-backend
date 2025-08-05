import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';
import * as dotenv from 'dotenv';
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadToCloudinary(buffer: Buffer, folder = 'profile-images') {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'image',
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      },
    );

    const readable = new Readable();
    readable.push(buffer);
    readable.push(null);
    readable.pipe(stream);
  });
}
