const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();

// seting env variable CLOUDINARY_URL or set the following configuration
cloudinary.config({
  cloud_name: process.env.cloud_name,
  API_Key: process.env.API_Key,
  API_Secret: process.env.API_Secret
});

exports.uploads = filename => {
  cloudinary.uploader.upload(filename, (error, result) => {
    if (error) {
      throw error;
    }
    response.send({ url: result.url, id: result.public_id });
  });
};