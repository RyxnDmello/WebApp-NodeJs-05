const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const wishSchema = new mongoose.Schema({
  product: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

const accountSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cart: {
    type: [cartSchema],
    required: true,
    _id: false,
  },
  wish: {
    type: [wishSchema],
    required: true,
    _id: false,
  },
});

const AccountModel = mongoose.model("account", accountSchema);

module.exports.AccountModel = AccountModel;
