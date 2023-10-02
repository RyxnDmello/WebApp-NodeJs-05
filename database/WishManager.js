const { DatabaseCreateProduct } = require("./wishlist/CreateProduct.js");
const { DatabaseDeleteProduct } = require("./wishlist/DeleteProduct.js");

const { DatabaseGetProducts } = require("./wishlist/GetProducts.js");
const { DatabaseResetWishlist } = require("./wishlist/ResetWishlist.js");

module.exports.CreateProduct = (email, product) => {
  DatabaseCreateProduct(email, product);
};

module.exports.DeleteProduct = (email, productID) => {
  DatabaseDeleteProduct(email, productID);
};

module.exports.GetProducts = async (email) => {
  return await DatabaseGetProducts(email);
};

module.exports.ResetWishlist = (email) => {
  DatabaseResetWishlist(email);
};
