const confg = require('./index');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: confg.CLOUDINARY_CLOUD_NAME,
  api_key: confg.CLOUDINARY_API_KEY,
  api_secret: confg.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;