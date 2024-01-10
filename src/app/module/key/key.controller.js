const { generateId } = require('../../../utils/generateId');
const { sendResponse } = require('../../../utils/sendResponse');
const consumerService = require('../consumer/consumer.service');
const Key = require('./key.model');
const keyService = require('./key.service');
const status = require('http-status');

/**
 * @desc    Generate new API Key for specified consumer/app to acces service provider
 * @route   /api/v1/key/:consumerId/key
 * @method  POST
 * @access  Private
 */

exports.createKey = async (req, res) => {
  const consumerId = req.params.consumerId;
  try {
    const {name, expiration} = req.body;
    const consumer = await consumerService.getConsumerByID(consumerId);

    secret_key = generateId(48);

    const publishable = {
      name: name,
      consumer: consumer._id,
      expiration: expiration,
      secret_key: `sk-${secret_key}`,
    }

    const publish = await keyService.createAPIKey(publishable)

    return res.status(status.CREATED).json({
      result: "success",
      key: {
        secret_key: publish.secret_key, 
        object: "api_key",
        name: publish.name,
        created: publish.createdAt,
        last_use: publish.lastUsed,
        publishable: false,
      }
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      result: "fail",
      statusCode: status.INTERNAL_SERVER_ERROR,
      debug: {
        message: error.message,
      },
      guide: "Please contact the administrator before continuing to use this service!"
    });
  }
};

/**
 * @desc    Change key information
 * @route   /api/v1/key/:id
 * @method  PUT
 * @access  Private
 */

exports.modifyKey = async (req, res) => {
  const { name } = req.body;

  try {
    const api_key = await keyService.getAPIKeyByID(req.params.id);
    await keyService.updateAPIKey(api_key, {name});
    return res.status(status.OK).json({
      result: "success",
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

/**
 * @desc    Delete key from subscription
 * @route   /api/v1/key/:id
 * @method  PUT
 * @access  Private
 */

exports.deleteKey = async (req, res) => {
  try {
    const api_key = await keyService.getAPIKeyByID(req.params.id);
    await keyService.deleteAPIKey(api_key);
    
    return res.status(status.NO_CONTENT).json({
      result: "success",
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
};

/**
 * @desc    Get all API Keys
 * @route   /api/v1/key/
 * @method  GET
 * @access  Private
 */

exports.keyList = async (req, res) => {
  try {
    const data = await Key.find()
    .sort({ createdAt: -1 })
    .select('-updatedAt -__v')
    .populate({
        path: 'consumer',
        select: '-__v -_id -updatedAt -createdAt'
    });
    return res.status(status.OK).json({
      object: "list",
      data: data
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
  
};