const { AccountModel } = require("../models/AccountModel.js");

const PlaystationTemplate = require("../../json/playstation.json");
const SwitchTemplate = require("../../json/switch.json");
const XboxTemplate = require("../../json/xbox.json");

module.exports.DatabaseGetProducts = async (email) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  const cart = [];

  for (let i = 0; i < databaseAccount.cart.length; i++) {
    const cartProduct = databaseAccount.cart[i];

    if (cartProduct.details.brand === "playstation") {
      cart.push({
        product: GetPlaystationProduct(cartProduct.ID, cartProduct.details),
        details: cartProduct.details,
        price: cartProduct.price,
      });
      continue;
    }

    if (cartProduct.details.brand === "xbox") {
      cart.push({
        product: GetXboxProduct(cartProduct.ID, cartProduct.details),
        details: cartProduct.details,
        price: cartProduct.price,
      });
      continue;
    }

    if (cartProduct.details.brand === "switch") {
      cart.push({
        product: GetSwitchProduct(cartProduct.ID, cartProduct.details),
        details: cartProduct.details,
        price: cartProduct.price,
      });
      continue;
    }
  }

  return cart;
};

function GetPlaystationProduct(ID, details) {
  const products = PlaystationTemplate[details.type][details.subType].products;
  return FindAndGetProductByID(ID, products);
}

function GetXboxProduct(ID, details) {
  const products = XboxTemplate[details.type][details.subType].products;
  return FindAndGetProductByID(ID, products);
}

function GetSwitchProduct(ID, details) {
  const products = SwitchTemplate[details.type][details.subType].products;
  return FindAndGetProductByID(ID, products);
}

function FindAndGetProductByID(ID, products) {
  for (let i = 0; i < products.length; i++) {
    if (products[i].ID === ID) return products[i];
  }
}
