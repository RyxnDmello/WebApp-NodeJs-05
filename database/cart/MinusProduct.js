const { AccountModel } = require("../models/AccountModel.js");

const { DatabaseDeleteProduct } = require("./DeleteProduct.js");

module.exports.DatabaseMinusProduct = async (email, productID) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  if (isDeletable(databaseAccount, productID)) {
    await DatabaseDeleteProduct(email, productID);
    return;
  }

  await MinusProduct(databaseAccount, productID);
};

const MinusProduct = async (databaseAccount, productID) => {
  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== productID) continue;

    --databaseAccount.cart[i].price.quantity;

    databaseAccount.cart[i].price.netPrice =
      databaseAccount.cart[i].price.basePrice *
      databaseAccount.cart[i].price.quantity;

    await databaseAccount.save();
  }
};

const isDeletable = (databaseAccount, productID) => {
  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== productID) continue;
    if (databaseAccount.cart[i].price.quantity === 1) return true;
  }

  return false;
};
