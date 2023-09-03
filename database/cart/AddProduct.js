const { AccountModel } = require("../models/AccountModel");

module.exports.DatabaseAddProduct = async (email, product) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== product.ID) continue;

    ++databaseAccount.cart[i].price.quantity;

    databaseAccount.cart[i].price.netPrice =
      databaseAccount.cart[i].price.basePrice *
      databaseAccount.cart[i].price.quantity;

    await databaseAccount.save();
  }
};
