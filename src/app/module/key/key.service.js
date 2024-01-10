const Key = require('./key.model');

/**
 * Generate API Key for apikey/app.
 *
 * @param {Object} keyData - The data for generating new api-key.
 * @returns {Object} Created api-key details.
 * @throws {Error} Throws an error if there's an issue creating the api-key.
 */
exports.createAPIKey = async keyData => {
    try {
      const keys = await Key.create(keyData);
      return keys;
    } catch (error) {
      throw new Error('Error creating keys');
    }
  };

/**
 * Retrieves a api- key by its ID.
 *
 * @param {string} keyId - The unique identifier of the api-key.
 * @returns {Object} Retrieved apikey details.
 * @throws {Error} Throws an error if there's an issue fetching the apikey data.
 */
exports.getAPIKeyByID = async keyId => {
  try {
    const apikey = await Key.findById(keyId).lean();
    if (!apikey) {
      throw new Error('API Key not found');
    }
    return apikey;
  } catch (error) {
    throw new Error('Error fetching apikey data by ID');
  }
};


/**
 * Updates an existing key in the database.
 *
 * @param {string} keyId - The unique identifier of the key.
 * @param {Object} updatedData - The updated data for the key.
 * @returns {Object} Updated key details.
 * @throws {Error} Throws an error if there's an issue updating the key.
 */
exports.updateAPIKey = async (keyId, updatedData) => {
  try {
    const consumer = await Key.findByIdAndUpdate(keyId, updatedData, {
      new: true,
    });
    return consumer;
  } catch (error) {
    throw new Error('Error updating consumer');
  }
};


/**
 * Deletes API-key from the database.
 *
 * @param {string} keyId - The unique identifier of the apikey.
 * @returns {Object} Deleted key details.
 * @throws {Error} Throws an error if there's an issue deleting the apikey.
 */
exports.deleteAPIKey = async keyId => {
  try {
    const apikey = await Key.findByIdAndRemove(keyId, { new: true });
    if (!apikey) {
      throw new Error('API-Key not found');
    }
    return apikey;
  } catch (error) {
    throw new Error('Error deleting apikey');
  }
};