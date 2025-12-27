const Notification = require("../models/Notification");
const socket = require("../socket");
exports.createNotification = async (req, res) => {
  try {
    const { type, message, level } = req.body;

    const noti = await Notification.create({
      type,
      message,
      level,
    });

    // 🔥 EMIT REALTIME CHO APP
    socket.getIO().emit("notification", {
      _id: noti._id,
      type: noti.type,
      message: noti.message,
      createdAt: noti.createdAt,
    });

    res.status(201).json(noti);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotifications = async (req, res) => {
  try {
    const limit = Number(req.query.limit || 50);
    const data = await Notification.find()
      .sort({ createdAt: -1 })
      .limit(limit);
    res.json(data.reverse());
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
