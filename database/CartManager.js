const { DatabaseAddProduct } = require("./cart/AddProduct.js");
const { DatabaseDeleteProduct } = require("./cart/DeleteProduct.js");
const { DatabaseGetProducts } = require("./cart/GetProducts.js");

module.exports.AddProduct = (email, product) => {
  DatabaseAddProduct(email, product);
};

module.exports.DeleteProduct = (email, productID) => {
  DatabaseDeleteProduct(email, productID);
};

module.exports.GetProducts = async (email) => {
  return await DatabaseGetProducts(email);
};
