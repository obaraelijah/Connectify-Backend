const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(process.cwd(), '.env') });

module.exports = {
  STRIPE_API_KEY: process.env.STRIPE_API_KEY,
  FRONTEND_URL: process.env.FRONTEND_URL,
  EMAIL: process.env.EMAIL,
  PASSWORD: process.env.PASSWORD,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_REFRESH: process.env.JWT_REFRESH,
  JWT_SECRET_EXPIRE: process.env.JWT_SECRET_EXPIRE,
  JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE,
  MONGODB_URI: process.env.MONGODB_URI,
  RESET_TOKEN_EXPIRE: process.env.RESET_TOKEN_EXPIRE,
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
};