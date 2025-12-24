const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  type: String,
  message: String,
  level: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Notification", notificationSchema);
