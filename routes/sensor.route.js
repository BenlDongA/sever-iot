const express = require("express");
const router = express.Router();
const controller = require("../controllers/sensor.controller");

router.post("/", controller.createSensor);
router.get("/latest", controller.getLatestSensor);

module.exports = router;
