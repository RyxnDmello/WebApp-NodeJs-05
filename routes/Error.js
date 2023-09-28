const express = require("express");
const router = express.Router();

const ErrorController = require("../controllers/ErrorController.js");

router.get("/:type", ErrorController.error);

module.exports = router;
