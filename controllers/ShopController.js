const Navbar = require("../json/common/navbar.json");
const Footer = require("../json/common/footer.json");

const PlaystationTemplate = require("../json/playstation.json");
const SwitchTemplate = require("../json/switch.json");
const XboxTemplate = require("../json/xbox.json");

const CartManager = require("../database/CartManager.js");
const WishManager = require("../database/WishManager.js");

const shop = (req, res) => {
  if (req.params.brand === "playstation") {
    res.render("shop", {
      navbar: Navbar,
      classes: PlaystationTemplate[req.params.type],
      footer: Footer.footer,
    });

    return;
  }

  if (req.params.brand === "xbox") {
    res.render("shop", {
      navbar: Navbar,
      classes: XboxTemplate[req.params.type],
      footer: Footer.footer,
    });

    return;
  }

  if (req.params.brand === "switch") {
    res.render("shop", {
      navbar: Navbar,
      classes: SwitchTemplate[req.params.type],
      footer: Footer.footer,
    });

    return;
  }
};

const product = (req, res) => {
  if (req.session.email === undefined) {
    res.redirect("/error/account-absent");
    return;
  }

  const product = req.body;

  if (req.body.action === "CART") {
    CartManager.CreateProduct(req.session.email, product);
    res.redirect("back");
    return;
  }

  if (req.body.action === "WISHLIST") {
    WishManager.CreateProduct(req.session.email, product);
    res.redirect("back");
    return;
  }
};

module.exports = {
  shop,
  product,
};
