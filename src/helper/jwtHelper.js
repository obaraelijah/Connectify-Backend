// Basic Lib consts
const jwt = require('jsonwebtoken');
const config = require('../config/index');

/**
 * @desc Generate JWT Token
 * @requires User id
 * */
const generateToken = id => {
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: config.JWT_SECRET_EXPIRE,
  });
};

/**
 * @desc Generate reset password token and set expiry time
 *
 * */
const generateResetToken = () => {
  const resetPasswordToken = crypto.randomBytes(20).toString('hex');
  const resetPasswordExpiry = Date.now() + config.RESET_TOKEN_EXPIRE;
  return { resetPasswordToken, resetPasswordExpiry };
};

/**
 * @desc Verify JWT Token
 * @requires Token
 * */
const verifyToken = token => {
  return jwt.verify(token, config.JWT_SECRET, { algorithms: ['HS256'] });
};

module.exports = { generateToken, generateResetToken, verifyToken };