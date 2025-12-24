const Relay = require("../models/Relay");

exports.getRelay = async (req, res) => {
  let relay = await Relay.findOne();
  if (!relay) {
    relay = await Relay.create({
      relay1: false,
      relay2: false,
      relay3: false,
      relay4: false
    });
  }
  res.json(relay);
};

exports.updateRelay = async (req, res) => {
  const { id } = req.params;       // 1,2,3,4
  const { state } = req.body;      // true / false

  if (!["1", "2", "3", "4"].includes(id)) {
    return res.status(400).json({ message: "Relay id không hợp lệ" });
  }

  const field = `relay${id}`;

  const relay = await Relay.findOneAndUpdate(
    {},
    {
      [field]: state,
      updatedAt: Date.now()
    },
    { new: true, upsert: true }
  );

  res.json(relay); // 🔥 RẤT QUAN TRỌNG
};
