const express = require("express");
const router = express.Router();

const AccountController = require("../controllers/AccountController.js");

router
  .route("/cart")
  .get(AccountController.cart)
  .post(AccountController.updateCart);

router
  .route("/wishlist")
  .get(AccountController.wishlist)
  .post(AccountController.updateWishlist);

module.exports = router;
