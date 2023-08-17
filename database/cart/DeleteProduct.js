const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseDeleteProduct = async (email, productID) => {
  const databaseAccount = await AccountModel.findOne({ email, email });

  for (let i = 0; i < databaseAccount.cart.length; i++) {
    const databaseProduct = databaseAccount.cart[i];

    if (databaseProduct.ID !== productID) continue;

    if (databaseProduct.quantity > 1) {
      databaseAccount.cart[i].quantity -= 1;
      await databaseAccount.save();
      return;
    }

    DeleteCompleteProduct(email, productID);
    return;
  }
};

const DeleteCompleteProduct = async (email, productID) => {
  await AccountModel.findOneAndUpdate(
    { email: email },
    {
      $pull: {
        cart: {
          ID: productID,
        },
      },
    }
  );
};
