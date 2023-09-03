const { AccountModel } = require("../models/AccountModel.js");

const { DatabaseDeleteProduct } = require("./DeleteProduct.js");

module.exports.DatabaseMinusProduct = async (email, product) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  if (isDeletable(databaseAccount, product)) {
    await DatabaseDeleteProduct(email, product.ID);
    return;
  }

  await MinusProduct(databaseAccount, product);
};

const MinusProduct = async (databaseAccount, product) => {
  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== product.ID) continue;

    --databaseAccount.cart[i].price.quantity;

    databaseAccount.cart[i].price.netPrice =
      databaseAccount.cart[i].price.basePrice *
      databaseAccount.cart[i].price.quantity;

    await databaseAccount.save();
  }
};

const isDeletable = (databaseAccount, product) => {
  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== product.ID) continue;
    if (databaseAccount.cart[i].price.quantity === 1) return true;
  }

  return false;
};
