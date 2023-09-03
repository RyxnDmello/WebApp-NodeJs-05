const { DatabaseCreateProduct } = require("./cart/CreateProduct.js");
const { DatabaseDeleteProduct } = require("./cart/DeleteProduct.js");

const { DatabaseAddProduct } = require("./cart/AddProduct.js");
const { DatabaseMinusProduct } = require("./cart/MinusProduct.js");

const { DatabaseGetProducts } = require("./cart/GetProducts.js");

module.exports.CreateProduct = (email, product) => {
  DatabaseCreateProduct(email, product);
};

module.exports.DeleteProduct = (email, productID) => {
  DatabaseDeleteProduct(email, productID);
};

module.exports.AddProduct = (email, product) => {
  DatabaseAddProduct(email, product);
};

module.exports.MinusProduct = (email, product) => {
  DatabaseMinusProduct(email, product);
};

module.exports.GetProducts = async (email) => {
  return await DatabaseGetProducts(email);
};
