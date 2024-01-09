/**
 * Generate random keys.
 *
 * @param {Number} limit - Total number of key.
 * @returns {Object} Generated key.
 * @throws {Error} Throws an error if there's an issue creating the api-key.
 */
function generateId(limit) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let customId = '';
    for (let i = 0; i < limit; i++) {
      customId += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return customId;
  }
  exports.generateId = generateId;