const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseResetCart = async (email) => {
  const databaseAccount = await AccountModel.findOne({ email: email });
  databaseAccount.cart = [];
  await databaseAccount.save();
};
