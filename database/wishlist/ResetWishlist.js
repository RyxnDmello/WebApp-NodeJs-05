const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseResetWishlist = async (email) => {
  const databaseAccount = await AccountModel.findOne({ email: email });
  databaseAccount.wishlist = [];
  await databaseAccount.save();
};
