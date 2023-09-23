const { AccountModel } = require("../models/AccountModel");

module.exports.DatabaseAddProduct = async (email, productID) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== productID) continue;

    ++databaseAccount.cart[i].price.quantity;

    databaseAccount.cart[i].price.netPrice =
      databaseAccount.cart[i].price.basePrice *
      databaseAccount.cart[i].price.quantity;

    await databaseAccount.save();
  }
};
