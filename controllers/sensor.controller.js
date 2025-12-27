const Sensor = require("../models/Sensor");
const Notification = require("../models/Notification");
const SensorHistory = require("../models/SensorHistory");
const socket = require("../socket");

// ======================
// CREATE SENSOR (ESP32 POST)
// ======================
exports.createSensor = async (req, res) => {
  try {
    const { temperature, humidity, mq2, soil } = req.body;

    // 1️⃣ Lưu latest sensor
    const sensor = await Sensor.findOneAndUpdate(
      {},
      { temperature, humidity, mq2, soil, updatedAt: Date.now() },
      { new: true, upsert: true }
    );

    // 2️⃣ Lưu history
    await SensorHistory.create({ temperature, humidity, mq2, soil });

    // 3️⃣ Cảnh báo nhiệt độ
    if (temperature > 37) {
      const noti = await Notification.create({
        type: "Nhiệt độ",
        message: `Nhiệt độ cao: ${temperature}°C`,
        level: "warning",
      });

      socket.getIO().emit("notification", {
        _id: noti._id,
        type: noti.type,
        message: noti.message,
        createdAt: noti.createdAt,
      });
    }

    // 4️⃣ Cảnh báo khí gas
    if (mq2 > 1000) {
      const noti = await Notification.create({
        type: "Khí gas",
        message: `Chỉ số MQ2 cao: ${mq2}`,
        level: "danger",
      });

      socket.getIO().emit("notification", {
        _id: noti._id,
        type: noti.type,
        message: noti.message,
        createdAt: noti.createdAt,
      });
    }

    res.status(201).json(sensor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================
// GET LATEST SENSOR
// ======================
exports.getLatestSensor = async (req, res) => {
  try {
    const data = await Sensor.findOne().sort({ updatedAt: -1 });
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ======================
// GET SENSOR HISTORY (FOR CHART)
// ======================
exports.getSensorHistory = async (req, res) => {
  try {
    const limit = Number(req.query.limit || 50);

    const data = await SensorHistory.find()
      .sort({ createdAt: -1 })
      .limit(limit);

    res.json(data.reverse()); // cũ → mới
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
