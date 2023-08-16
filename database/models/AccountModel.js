const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  subType: {
    type: String,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  details: {
    type: detailsSchema,
    required: true,
    _id: false,
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
    type: [productSchema],
    required: true,
    _id: false,
  },
  wish: {
    type: [productSchema],
    required: true,
    _id: false,
  },
});

const AccountModel = mongoose.model("account", accountSchema);

module.exports.AccountModel = AccountModel;
