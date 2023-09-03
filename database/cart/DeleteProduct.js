const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseDeleteProduct = async (email, productID) => {
  const databaseAccount = await AccountModel.findOne({ email, email });

  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== productID) continue;

    databaseAccount.cart.splice(i, 1);
    await databaseAccount.save();
    return;
  }
};
