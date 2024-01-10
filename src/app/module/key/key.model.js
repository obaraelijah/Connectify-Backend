const mongoose = require('mongoose');

// Key Schema Definition

const keySchema = new mongoose.Schema(
  {
    consumer: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Consumer',
    },
    name: { type: String, required: false, default: "My Test Key"},
    object: { type: String, default: "api_key" },
    secret_key: { type: String, required: true, unique: true  },
    expiration: { type: Date },
    lastUsed: { type: Date, default: null  },
    usageStats: { type: Number, default: 0 },
    publishable: { type: Boolean, default: false },
  },
  { timestamps: true},
);

const Key = mongoose.model('Key', keySchema);
module.exports = Key;