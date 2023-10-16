const { DatabaseCreateProduct } = require("./cart/CreateProduct.js");
const { DatabaseDeleteProduct } = require("./cart/DeleteProduct.js");
const { DatabaseCartToWishlist } = require("./cart/CartToWishlist.js");

const { DatabaseAddProduct } = require("./cart/AddProduct.js");
const { DatabaseMinusProduct } = require("./cart/MinusProduct.js");

const { DatabaseGetProducts } = require("./cart/GetProducts.js");
const { DatabaseResetCart } = require("./cart/ResetCart.js");

module.exports.CreateProduct = async (email, product) => {
  await DatabaseCreateProduct(email, product);
};

module.exports.DeleteProduct = async (email, productID) => {
  await DatabaseDeleteProduct(email, productID);
};

module.exports.CartToWishlist = async (email, productID) => {
  await DatabaseCartToWishlist(email, productID);
};

module.exports.AddProduct = async (email, productID) => {
  await DatabaseAddProduct(email, productID);
};

module.exports.MinusProduct = async (email, productID) => {
  await DatabaseMinusProduct(email, productID);
};

module.exports.ResetCart = async (email) => {
  await DatabaseResetCart(email);
};

module.exports.GetProducts = async (email) => {
  return await DatabaseGetProducts(email);
};
