const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseGetProducts = async (email) => {
  const databaseAccount = await AccountModel.findOne({ email: email });
  return databaseAccount.cart;
};
