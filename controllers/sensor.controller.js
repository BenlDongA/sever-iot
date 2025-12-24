const Sensor = require("../models/Sensor");
const Notification = require("../models/Notification");
const SensorHistory = require("../models/SensorHistory");

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

    // 3️⃣ Cảnh báo khí gas
    if (mq2 > 1000) {
      await Notification.create({
        type: "Khí gas",
        message: `Chỉ số MQ2 cao: ${mq2}`,
        level: "danger"
      });
    }

    res.status(201).json(sensor);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Lấy latest
exports.getLatestSensor = async (req, res) => {
  const data = await Sensor.findOne().sort({ createdAt: -1 });
  res.json(data);
};

// 🔥 API mới: Lấy history cho chart
exports.getSensorHistory = async (req, res) => {
  const limit = Number(req.query.limit || 50); // mặc định 50 điểm

  const data = await SensorHistory.find()
    .sort({ createdAt: -1 })
    .limit(limit);

  res.json(data.reverse()); // đảo để chart từ cũ → mới
};
