const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_KEY_SECRET,
});

console.log(
  "Cloudinary config:",
  process.env.CLOUD_NAME,
  process.env.CLOUD_KEY,
  process.env.CLOUD_KEY_SECRET
);
module.exports = cloudinary;
