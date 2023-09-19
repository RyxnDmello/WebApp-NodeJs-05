const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseResetCart = async (email) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  if (databaseAccount.cart.length === 0) return;

  databaseAccount.cart = [];
  await databaseAccount.save();
};
