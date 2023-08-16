const { DatabaseAddProduct } = require("./cart/AddProduct.js");
const { DatabaseGetProducts } = require("./cart/GetProducts.js");

module.exports.AddProduct = (email, product) => {
  DatabaseAddProduct(email, product);
};

module.exports.GetProducts = async (email) => {
  return await DatabaseGetProducts(email);
};
