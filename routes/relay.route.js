const express = require("express");
const router = express.Router();
const controller = require("../controllers/relay.controller");

router.get("/", controller.getRelay);
router.put("/:id", controller.updateRelay);


module.exports = router;
