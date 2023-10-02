const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseDeleteProduct = async (email, productID) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  for (let i = 0; i < databaseAccount.wishlist.length; i++) {
    if (databaseAccount.wishlist[i].ID !== productID) continue;
    databaseAccount.wishlist.splice(i, 1);
    await databaseAccount.save();
    return;
  }
};
