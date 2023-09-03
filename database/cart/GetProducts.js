const { AccountModel } = require("../models/AccountModel.js");

const PlaystationTemplate = require("../../json/playstation.json");
const SwitchTemplate = require("../../json/switch.json");
const XboxTemplate = require("../../json/xbox.json");

module.exports.DatabaseGetProducts = async (email) => {
  const databaseAccount = await AccountModel.findOne({ email: email });
  const cart = CreateCart(databaseAccount);
  const bill = CreateBill(databaseAccount);

  return { cart, bill };
};

const CreateBill = (account) => {
  if (account.cart.length === 0) return "EMPTY";

  let originalsLength = 0;
  let skinsLength = 0;
  let combosLength = 0;

  let originalsNetPrice = 0;
  let skinsNetPrice = 0;
  let combosNetPrice = 0;

  for (let i = 0; i < account.cart.length; i++) {
    const cartProduct = account.cart[i];

    if (cartProduct.details.class === "originals") {
      originalsNetPrice += cartProduct.price.netPrice;
      originalsLength += cartProduct.price.quantity;
      continue;
    }

    if (cartProduct.details.class === "skins") {
      skinsNetPrice += cartProduct.price.netPrice;
      skinsLength += cartProduct.price.quantity;
      continue;
    }

    if (cartProduct.details.class === "combos") {
      combosNetPrice += cartProduct.price.netPrice;
      combosLength += cartProduct.price.quantity;
      continue;
    }
  }

  return {
    originals: {
      quantity: originalsLength,
      price: originalsNetPrice,
    },
    skins: {
      quantity: skinsLength,
      price: skinsNetPrice,
    },
    combos: {
      quantity: combosLength,
      price: combosNetPrice,
    },
    total: {
      quantity: originalsLength + skinsLength + combosLength,
      price: originalsNetPrice + skinsNetPrice + combosNetPrice,
    },
  };
};

const CreateCart = (account) => {
  if (account.cart.length === 0) return "EMPTY";

  const originals = [];
  const skins = [];
  const combos = [];

  for (let i = 0; i < account.cart.length; i++) {
    const cartProduct = account.cart[i];

    if (cartProduct.details.brand === "playstation") {
      const product = {
        product: GetPlaystationProduct(cartProduct.ID, cartProduct.details),
        details: cartProduct.details,
        price: cartProduct.price,
      };

      if (product.details.class === "originals") originals.push(product);
      if (product.details.class === "skins") skins.push(product);
      if (product.details.class === "combos") combos.push(product);
      continue;
    }

    if (cartProduct.details.brand === "xbox") {
      const product = {
        product: GetXboxProduct(cartProduct.ID, cartProduct.details),
        details: cartProduct.details,
        price: cartProduct.price,
      };

      if (product.details.class === "originals") originals.push(product);
      if (product.details.class === "skins") skins.push(product);
      if (product.details.class === "combos") combos.push(product);
      continue;
    }

    if (cartProduct.details.brand === "switch") {
      const product = {
        product: GetSwitchProduct(cartProduct.ID, cartProduct.details),
        details: cartProduct.details,
        price: cartProduct.price,
      };

      if (product.details.class === "originals") originals.push(product);
      if (product.details.class === "skins") skins.push(product);
      if (product.details.class === "combos") combos.push(product);
      continue;
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
