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
  class: {
    type: String,
    required: true,
  },
});

const priceSchema = new mongoose.Schema({
  basePrice: {
    type: Number,
    required: true,
  },
  netPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const productSchema = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  price: {
    type: priceSchema,
    required: true,
    _id: false,
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
  wishlist: {
    type: [productSchema],
    required: true,
    _id: false,
  },
});

const AccountModel = mongoose.model("account", accountSchema);

module.exports.AccountModel = AccountModel;
