const Sensor = require("../models/Sensor");
const Notification = require("../models/Notification");

exports.createSensor = async (req, res) => {
  try {
    const { temperature, humidity, mq2, soil } = req.body;

    const sensor = await Sensor.create({
      temperature,
      humidity,
      mq2,
      soil
    });

    // Cảnh báo khí gas
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

exports.getLatestSensor = async (req, res) => {
  const data = await Sensor.findOne().sort({ createdAt: -1 });
  res.json(data);
};
