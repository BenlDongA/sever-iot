const express = require("express");
const router = express.Router();
const controller = require("../controllers/notification.controller");

// Lấy danh sách thông báo
router.get("/", controller.getAllNotifications);

module.exports = router;
