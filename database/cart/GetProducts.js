const { AccountModel } = require("../models/AccountModel.js");

const PlaystationTemplate = require("../../json/playstation.json");
const SwitchTemplate = require("../../json/switch.json");
const XboxTemplate = require("../../json/xbox.json");

module.exports.DatabaseGetProducts = async (email) => {
  const databaseAccount = await AccountModel.findOne({ email: email });

  const products = [];

  for (let i = 0; i < databaseAccount.cart.length; i++) {
    const cartProduct = databaseAccount.cart[i];

    if (cartProduct.details.brand === "playstation") {
      products.push({
        details: GetPlaystationProduct(cartProduct.ID, cartProduct.details),
        price: cartProduct.price,
      });
      continue;
    }

    if (cartProduct.details.brand === "xbox") {
      products.push({
        details: GetXboxProduct(cartProduct.ID, cartProduct.details),
        price: cartProduct.price,
      });
      continue;
    }

    if (cartProduct.details.brand === "switch") {
      products.push({
        details: GetSwitchProduct(cartProduct.ID, cartProduct.details),
        price: cartProduct.price,
      });
      continue;
    }
  }

  return products;
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
