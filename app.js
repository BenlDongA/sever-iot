const express = require("express");
const cors = require("cors");

const sensorRoute = require("./routes/sensor.route");
const relayRoute = require("./routes/relay.route");
const notificationRoute = require("./routes/notification.route");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/sensor", sensorRoute);
app.use("/api/relay", relayRoute);
app.use("/api/notification", notificationRoute);

module.exports = app;
