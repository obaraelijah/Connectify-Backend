const { sendResponse } = require('../../../utils/sendResponse');
const Consumer = require('./consumer.model');
const consumerService = require('./consumer.service');
const asyncHandler = require('express-async-handler');
const status = require('http-status');

/**
 * @desc    Get all subscribed consumer
 * @route   /api/v1/consumer/
 * @method  GET
 * @access  Private
 */

exports.consumerList = asyncHandler(async (req, res) => {
  try {
    const consumer = await Consumer.find();
    sendResponse(res, status.OK, true, 'Consumer retrived successfully', {
      consumer,
    });
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
});

/**
 * @desc    Create new consumer for subscription
 * @route   /api/v1/consumer/
 * @method  POST
 * @access  Private
 */

exports.createConsumer = asyncHandler(async (req, res) => {
  try {
    // Extract consumer data from the request body
    const { name, description } = req.body;

    // Validate Fields
    if (!name) {
      return sendResponse(res, status.NOT_FOUND, false, 'App name is required');
    }

    const consumerData = { name, description };

    const consumer = await consumerService.createConsumer(consumerData);
    return sendResponse(
      res,
      status.CREATED,
      true,
      'App created successfully',
      consumer,
    );
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
});

/**
 * @desc    Change consumer information
 * @route   /api/v1/consumer/
 * @method  PUT
 * @access  Private
 */

exports.modifyConsumer = asyncHandler(async (req, res) => {
  const { name, description } = req.body;

  try {
    const consumerId = await consumerService.getConsumerByID(req.params.id);

    if (!consumerId) {
      sendResponse(res, status.NOT_FOUND, false, 'No consumers found');
    }

    const updateConsumer = await consumerService.updateConsumer(consumerId, {
      name,
      description,
    });

    sendResponse(
      res,
      status.OK,
      true,
      'Consumers modified successfully',
      updateConsumer,
    );
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
});

/**
 * @desc    Delete consumer from subscription
 * @route   /api/v1/consumer/
 * @method  PUT
 * @access  Private
 */

exports.deleteConsumer = asyncHandler(async (req, res) => {
  try {
    const consumer = await consumerService.getConsumerByID(req.params.id);
    if (!consumer) {
      sendResponse(res, status.NOT_FOUND, true, 'consumer not found');
    }
    const deletedconsumer = await consumerService.deleteConsumer(consumer);
    sendResponse(
      res,
      status.OK,
      false,
      'Consumer was deleted',
      deletedconsumer,
    );
  } catch (error) {
    res.status(status.INTERNAL_SERVER_ERROR).json({
      statusCode: status.INTERNAL_SERVER_ERROR,
      message: error.message,
    });
  }
});