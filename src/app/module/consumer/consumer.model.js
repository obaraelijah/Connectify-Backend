const mongoose = require('mongoose');

// Consumer Schema Definition

const consumerSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: false },
  },
  { timestamps: true },
);

const Consumer = mongoose.model('Consumer', consumerSchema);
module.exports = Consumer;