const mongoose = require("mongoose");

const SensorHistorySchema = new mongoose.Schema(
  {
    temperature: Number,
    humidity: Number,
    mq2: Number,
    soil: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("SensorHistory", SensorHistorySchema);
