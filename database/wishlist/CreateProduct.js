const { AccountModel } = require("../models/AccountModel.js");
const { DatabaseAddProduct } = require("./AddProduct.js");
const prices = require("../../json/prices.json");

module.exports.DatabaseCreateProduct = async (email, product) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  if (isWishlist(databaseAccount, product.ID)) {
    DatabaseAddProduct(databaseAccount, product.ID);
    return;
  }

  await CreateProduct(databaseAccount, product);
};

const CreateProduct = async (databaseAccount, product) => {
  const basePrice = prices[product.brand][product.type][product.class];

  databaseAccount.wishlist.push({
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

const isWishlist = (databaseAccount, productID) => {
  for (let i = 0; i < databaseAccount.wishlist.length; i++) {
    if (databaseAccount.wishlist[i].ID === productID) return true;
  }

  return false;
};
