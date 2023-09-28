const express = require("express");
const router = express.Router();

const ShopController = require("../controllers/ShopController.js");

router.get("/:brand/:type", ShopController.shop);
router.post("/product", ShopController.product);

module.exports = router;
