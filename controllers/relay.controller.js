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
  const relay = await Relay.findOneAndUpdate(
    {},
    { ...req.body, updatedAt: Date.now() },
    { new: true, upsert: true }
  );
  res.json(relay);
};
