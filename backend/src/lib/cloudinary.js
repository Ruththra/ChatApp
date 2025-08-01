import {v2 as cloudinary} from 'cloudinary';
import dotenv from 'dotenv';
// import {config} from 'dotenv';

dotenv.config();
console.log("Cloudinary configuration loaded from environment variables");
console.log("Cloudinary configuration:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;
// This code configures Cloudinary with the credentials from the environment variables.