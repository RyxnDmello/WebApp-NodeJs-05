const CartManager = require("../database/CartManager.js");
const WishManager = require("../database/WishManager.js");

const cart = async (req, res) => {
  if (req.session.email === undefined) {
    res.redirect("/error/account-absent");
    return;
  }

  const { cart, bill } = await CartManager.GetProducts(req.session.email);

  res.render("cart", { cart: cart, bill: bill });
};

const wishlist = async (req, res) => {
  if (req.session.email === undefined) {
    res.redirect("/error/account-absent");
    return;
  }

  const wishlist = await WishManager.GetProducts(req.session.email);

  res.render("wishlist", { wishlist: wishlist });
};

const updateCart = (req, res) => {
  const product = req.body;

  if (req.body.action === "INCREASE") {
    CartManager.AddProduct(req.session.email, product.ID);
    res.redirect("back");
    return;
  }

  if (req.body.action === "DECREASE") {
    CartManager.MinusProduct(req.session.email, product.ID);
    res.redirect("back");
    return;
  }

  if (req.body.action === "DELETE") {
    CartManager.DeleteProduct(req.session.email, product.ID);
    res.redirect("back");
    return;
  }

  if (req.body.action === "RESET") {
    CartManager.ResetCart(req.session.email);
    res.redirect("back");
    return;
  }
};

const updateWishlist = (req, res) => {
  const product = req.body;
  console.log(product);
  res.redirect("back");
};

module.exports = {
  cart,
  wishlist,
  updateCart,
  updateWishlist,
};
