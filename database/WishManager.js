const { DatabaseCreateProduct } = require("./wishlist/CreateProduct.js");
const { DatabaseDeleteProduct } = require("./wishlist/DeleteProduct.js");
const { DatabaseWishlistToCart } = require("./wishlist/WishlistToCart.js");

const { DatabaseGetProducts } = require("./wishlist/GetProducts.js");
const { DatabaseResetWishlist } = require("./wishlist/ResetWishlist.js");

module.exports.CreateProduct = async (email, product) => {
  await DatabaseCreateProduct(email, product);
};

module.exports.DeleteProduct = async (email, productID) => {
  await DatabaseDeleteProduct(email, productID);
};

module.exports.WishlistToCart = async (email, productID) => {
  await DatabaseWishlistToCart(email, productID);
};

module.exports.GetProducts = async (email) => {
  return await DatabaseGetProducts(email);
};

module.exports.ResetWishlist = async (email) => {
  await DatabaseResetWishlist(email);
};
