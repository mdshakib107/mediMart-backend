import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import multer from 'multer'; 
import config from '../config';

interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  // Add other properties that you expect from the Cloudinary response
}


cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export const sendImageToCloudinary = (imageName: string, path: string): Promise<CloudinaryUploadResponse> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: imageName },
      function (error, result) {
        if (error) {
          reject(error);
        } else {
          // Type the result to CloudinaryUploadResponse
          resolve(result as CloudinaryUploadResponse); // Type assertion here
        }

        // Delete the file asynchronously
        fs.unlink(path, (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log('File is deleted.');
          }
        });
      },
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });