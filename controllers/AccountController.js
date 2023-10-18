const Navbar = require("../json/common/navbar.json");

const CartManager = require("../database/CartManager.js");
const WishManager = require("../database/WishManager.js");

const cart = async (req, res) => {
  if (req.session.email === undefined) {
    res.redirect("/error/account-absent");
    return;
  }

  const { cart, bill } = await CartManager.GetProducts(req.session.email);

  res.render("cart", {
    navbar: Navbar,
    cart: cart,
    bill: bill,
  });
};

const wishlist = async (req, res) => {
  if (req.session.email === undefined) {
    res.redirect("/error/account-absent");
    return;
  }

  const wishlist = await WishManager.GetProducts(req.session.email);

  res.render("wishlist", {
    navbar: Navbar,
    wishlist: wishlist,
  });
};

const updateCart = async (req, res) => {
  const product = req.body;

  if (req.body.action === "INCREASE") {
    await CartManager.AddProduct(req.session.email, product.ID);
    res.redirect("back");
    return;
  }

  if (req.body.action === "DECREASE") {
    await CartManager.MinusProduct(req.session.email, product.ID);
    res.redirect("back");
    return;
  }

  if (req.body.action === "DELETE") {
    await CartManager.DeleteProduct(req.session.email, product.ID);
    res.redirect("back");
    return;
  }

  if (req.body.action === "RESET") {
    await CartManager.ResetCart(req.session.email);
    res.redirect("back");
    return;
  }

  if (req.body.action === "WISHLIST") {
    await CartManager.CartToWishlist(req.session.email, product.ID);
    res.redirect("back");
    return;
  }
};

const updateWishlist = async (req, res) => {
  const product = req.body;

  if (req.body.action === "CART") {
    await WishManager.WishlistToCart(req.session.email, product.ID);
    res.redirect("back");
  }

  if (req.body.action === "DELETE") {
    await WishManager.DeleteProduct(req.session.email, product.ID);
    res.redirect("back");
  }

  if (req.body.action === "RESET") {
    await WishManager.ResetWishlist(req.session.email);
    res.redirect("back");
  }
};

module.exports = {
  cart,
  wishlist,
  updateCart,
  updateWishlist,
};
