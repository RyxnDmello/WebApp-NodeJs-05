const { DatabaseCreateProduct } = require("./wishlist/CreateProduct.js");
const { DatabaseGetProducts } = require("./wishlist/GetProducts.js");

module.exports.CreateProduct = (email, product) => {
  DatabaseCreateProduct(email, product);
};

module.exports.GetProducts = async (email) => {
  return await DatabaseGetProducts(email);
};
