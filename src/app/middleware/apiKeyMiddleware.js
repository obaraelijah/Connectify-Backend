const Key = require('../module/key/key.model');
const status = require('http-status');

const apiKeyAuthMiddleware = async (req, res, next) => {
  const APP_ID = req.get('app_id');
  const API_KEY = req.get('api_key');

  if (!APP_ID) {
    return res.status(status.NOT_ACCEPTABLE).json({
      success: false,
      statusCode: status.NOT_ACCEPTABLE,
      message: 'APP_ID is required.',
    });
  }

  if (!API_KEY) {
    return res.status(status.NOT_ACCEPTABLE).json({
      success: false,
      statusCode: status.NOT_ACCEPTABLE,
      message: 'API key is required.',
    });
  }

  try {
    const apiKey = await Key.findOne({ consumer: APP_ID, secret_key: API_KEY });

    if (!apiKey) {
      return res
        .status(status.UNAUTHORIZED)
        .json({ success: false, message: 'Invalid API key.' });
    }

    // Check the expiration of the API key
    const currentDate = new Date();
    const keyExpirationDate = new Date(apiKey.expiration);

    if (currentDate > keyExpirationDate) {
      return res.status(status.UNAUTHORIZED).json({
        success: false,
        message: 'Access denied. Your API key has expired.',
        guide:
          'Please renew your API key to continue accessing our services. If you need assistance, contact hossain.chisty11@gmail.com.',
      });
    }

    // Update lastUsed and usageStats fields
    apiKey.lastUsed = currentDate;
    apiKey.usageStats += 1;
    await apiKey.save();

    // Valid API key, proceed to the next middleware or route handler
    next();
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

module.exports = apiKeyAuthMiddleware;