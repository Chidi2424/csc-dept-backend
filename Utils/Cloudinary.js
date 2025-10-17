const cloudinary = require("cloudinary").v2;

const cloudName = process.env.CLOUD_NAME;
const apiKey = process.env.CLOUD_KEY;
const apiSecret = process.env.CLOUD_KEY_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  console.error(
    "Cloudinary credentials are missing. Please set CLOUD_NAME, CLOUD_KEY and CLOUD_KEY_SECRET in your .env"
  );
} else {
  cloudinary.config({
    cloud_name: cloudName,
    api_key: apiKey,
    api_secret: apiSecret,
  });
  console.log("Cloudinary configured with cloud:", cloudName);
}

module.exports = cloudinary;
