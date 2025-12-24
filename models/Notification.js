const mongoose = require("mongoose");

const NotificationSchema = new mongoose.Schema(
  {
    type: String,
    message: String,
    level: { type: String, default: "info" },
  },
  { timestamps: true } // tạo createdAt, updatedAt
);

module.exports = mongoose.model("Notification", NotificationSchema);
