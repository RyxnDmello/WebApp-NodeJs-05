const { AccountModel } = require("../models/AccountModel.js");
const prices = require("../../json/prices.json");

const { DatabaseAddProduct } = require("./AddProduct.js");

module.exports.DatabaseCreateProduct = async (email, product) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  if (isCart(databaseAccount, product)) {
    await DatabaseAddProduct(email, product.ID);
    return;
  }

  await CreateProduct(databaseAccount, product);
};

const CreateProduct = async (databaseAccount, product) => {
  const basePrice = prices[product.brand][product.type][product.class];

  databaseAccount.cart.push({
    ID: product.ID,
    price: {
      basePrice: basePrice,
      netPrice: basePrice,
      quantity: 1,
    },
    details: {
      brand: product.brand,
      type: product.type,
      class: product.class,
    },
  });

  await databaseAccount.save();
};

const isCart = (databaseAccount, product) => {
  for (let i = 0; i < databaseAccount.cart.length; i++) {
    if (databaseAccount.cart[i].ID === product.ID) return true;
  }

  return false;
};
