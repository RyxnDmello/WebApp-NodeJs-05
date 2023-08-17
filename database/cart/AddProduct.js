const { AccountModel } = require("../models/AccountModel");

module.exports.DatabaseAddProduct = async (email, product) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== product.ID) continue;

    databaseAccount.cart[i].quantity += 1;
    await databaseAccount.save();
    return;
  }

  await AccountModel.findOneAndUpdate(
    { email: email },
    {
      $push: {
        cart: {
          ID: product.ID,
          details: product.details,
          date: "16 August, 2023",
          quantity: 1,
        },
      },
    }
  );
};
