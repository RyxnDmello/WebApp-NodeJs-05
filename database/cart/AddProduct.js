const { AccountModel } = require("../models/AccountModel");

const prices = require("../../json/prices.json");

module.exports.DatabaseAddProduct = async (email, product) => {
  if (await DatabaseUpdateProduct(email, product)) return;
  DatabaseCreateProduct(email, product);
};

const DatabaseUpdateProduct = async (email, product) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  if (databaseAccount.cart.length === 0) return false;

  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID !== product.ID) continue;

    ++databaseAccount.cart[i].price.quantity;

    databaseAccount.cart[i].price.netPrice =
      databaseAccount.cart[i].price.basePrice *
      databaseAccount.cart[i].price.quantity;

    await databaseAccount.save();
    return true;
  }

  return false;
};

const DatabaseCreateProduct = async (email, product) => {
  const basePrice =
    prices[product.details.brand][product.details.type][
      product.details.subType
    ];

  await AccountModel.findOneAndUpdate(
    { email: email },
    {
      $push: {
        cart: {
          ID: product.ID,
          price: {
            basePrice: basePrice,
            netPrice: basePrice,
            quantity: 1,
          },
          details: product.details,
        },
      },
    }
  );
};
