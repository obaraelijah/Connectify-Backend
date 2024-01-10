const Consumer = require('./consumer.model');

/**
 * Retrieves a paginated list of consumer from the database.
 *
 * @param {number} page - The page number for pagination.
 * @returns {Array} Paginated list of consumer.
 * @throws {Error} Throws an error if there's an issue fetching consumer data.
 */
exports.getConsumerList = async (page = 1) => {
  try {
    const itemsPerPage = 12;
    const skip = (page - 1) * itemsPerPage;
    const consumer = await Consumer.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage);
    return consumer;
  } catch (error) {
    throw new Error('Error fetching consumer data');
  }
};

/**
 * Creates a new consumer in the database.
 *
 * @param {Object} consumerData - The data for the new consumer.
 * @returns {Object} Created consumer details.
 * @throws {Error} Throws an error if there's an issue creating the consumer.
 */
exports.createConsumer = async consumerData => {
  try {
    const consumer = await Consumer.create(consumerData);
    return consumer;
  } catch (error) {
    throw new Error('Error creating consumer');
  }
};

/**
 * Updates an existing consumer in the database.
 *
 * @param {string} consumerId - The unique identifier of the consumer.
 * @param {Object} updatedData - The updated data for the consumer.
 * @returns {Object} Updated consumer details.
 * @throws {Error} Throws an error if there's an issue updating the consumer.
 */
exports.updateConsumer = async (consumerId, updatedData) => {
  try {
    const consumer = await Consumer.findByIdAndUpdate(consumerId, updatedData, {
      new: true,
    });
    if (!consumer) {
      throw new Error('Consumer not found');
    }
    return consumer;
  } catch (error) {
    throw new Error('Error updating consumer');
  }
};

/**
 * Deletes a consumer from the database.
 *
 * @param {string} consumerId - The unique identifier of the consumer.
 * @returns {Object} Deleted consumer details.
 * @throws {Error} Throws an error if there's an issue deleting the consumer.
 */
exports.deleteConsumer = async consumerId => {
  try {
    const consumer = await Consumer.findByIdAndRemove(consumerId, { new: true });
    if (!consumer) {
      throw new Error('consumer not found');
    }
    return consumer;
  } catch (error) {
    throw new Error('Error deleting consumer');
  }
};

/**
 * Retrieves a consumer by its ID.
 *
 * @param {string} consumerId - The unique identifier of the consumer.
 * @returns {Object} Retrieved consumer details.
 * @throws {Error} Throws an error if there's an issue fetching the consumer data.
 */
exports.getConsumerByID = async consumerId => {
    try {
      const consumer = await Consumer.findById(consumerId).lean();
      if (!consumer) {
        throw new Error('Consumer not found');
      }
      return consumer;
    } catch (error) {
      throw new Error('Error fetching consumer data by ID');
    }
  };