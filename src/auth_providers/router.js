const express = require("express");
const router = express.Router();

router.use("/google", require("./strategies/google"));

module.exports = router;