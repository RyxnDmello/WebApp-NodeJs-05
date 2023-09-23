const { DatabaseCreateProduct } = require("./cart/CreateProduct.js");
const { DatabaseDeleteProduct } = require("./cart/DeleteProduct.js");

const { DatabaseAddProduct } = require("./cart/AddProduct.js");
const { DatabaseMinusProduct } = require("./cart/MinusProduct.js");

const { DatabaseGetProducts } = require("./cart/GetProducts.js");
const { DatabaseResetCart } = require("./cart/ResetCart.js");

module.exports.CreateProduct = (email, product) => {
  DatabaseCreateProduct(email, product);
};

module.exports.DeleteProduct = (email, productID) => {
  DatabaseDeleteProduct(email, productID);
};

module.exports.AddProduct = (email, productID) => {
  DatabaseAddProduct(email, productID);
};

module.exports.MinusProduct = (email, productID) => {
  DatabaseMinusProduct(email, productID);
};

module.exports.ResetCart = (email) => {
  DatabaseResetCart(email);
};

module.exports.GetProducts = async (email) => {
  return await DatabaseGetProducts(email);
};
