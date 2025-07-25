const express = require("express");
const router = express.Router();
const taskApi = require("./task.api.js");

router.use("/tasks", taskApi);

module.exports = router;
