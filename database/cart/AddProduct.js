const { AccountModel } = require("../models/AccountModel");

module.exports.DatabaseAddProduct = async (email, product) => {
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
