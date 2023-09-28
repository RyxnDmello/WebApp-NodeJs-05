const express = require("express");
const router = express.Router();

const HomeController = require("../controllers/HomeControllers.js");

router.get("/", HomeController.home);

router
  .route("/register")
  .get(HomeController.register)
  .post(HomeController.create);

module.exports = router;
