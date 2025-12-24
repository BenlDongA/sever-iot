const mongoose = require("mongoose");

const relaySchema = new mongoose.Schema({
  relay1: Boolean,
  relay2: Boolean,
  relay3: Boolean,
  relay4: Boolean,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Relay", relaySchema);
