const { AccountModel } = require("../models/AccountModel.js");

const PlaystationTemplate = require("../../json/playstation.json");
const XboxTemplate = require("../../json/xbox.json");
const SwitchTemplate = require("../../json/switch.json");

module.exports.DatabaseGetProducts = async (email) => {
  const databaseAccount = await AccountModel.findOne({ email: email });
  const wishlist = CreateWishlist(databaseAccount);
  return wishlist;
};

const CreateWishlist = (account) => {
  if (account.wish.length === 0) return "EMPTY";

  const originals = [];
  const skins = [];
  const combos = [];

  for (let i = 0; i < account.wish.length; i++) {
    const wishProduct = account.wish[i];

    if (wishProduct.details.brand === "playstation") {
      const product = {
        product: GetPlaystationProduct(wishProduct.ID, wishProduct.details),
        details: wishProduct.details,
        price: wishProduct.price,
      };

      if (wishProduct.details.class === "originals") originals.push(product);
      if (wishProduct.details.class === "skins") skins.push(product);
      if (wishProduct.details.class === "combos") combos.push(product);
    }

    if (wishProduct.details.brand === "xbox") {
      const product = {
        product: GetXboxProduct(wishProduct.ID, wishProduct.details),
        details: wishProduct.details,
        price: wishProduct.price,
      };

      if (wishProduct.details.class === "originals") originals.push(product);
      if (wishProduct.details.class === "skins") skins.push(product);
      if (wishProduct.details.class === "combos") combos.push(product);
    }

    if (wishProduct.details.brand === "switch") {
      const product = {
        product: GetSwitchProduct(wishProduct.ID, wishProduct.details),
        details: wishProduct.details,
        price: wishProduct.price,
      };

      if (wishProduct.details.class === "originals") originals.push(product);
      if (wishProduct.details.class === "skins") skins.push(product);
      if (wishProduct.details.class === "combos") combos.push(product);
    }
  }

  return {
    originals: originals,
    skins: skins,
    combos: combos,
  };
};

const GetPlaystationProduct = (ID, details) => {
  const products = PlaystationTemplate[details.type][details.class].products;
  return FindAndGetProductByID(ID, products);
};

const GetXboxProduct = (ID, details) => {
  const products = XboxTemplate[details.type][details.class].products;
  return FindAndGetProductByID(ID, products);
};

const GetSwitchProduct = (ID, details) => {
  const products = SwitchTemplate[details.type][details.class].products;
  return FindAndGetProductByID(ID, products);
};

const FindAndGetProductByID = (ID, products) => {
  for (let i = 0; i < products.length; i++) {
    if (products[i].ID === ID) return products[i];
  }
};
