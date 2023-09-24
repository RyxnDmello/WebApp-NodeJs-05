require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");

const HomeTemplate = require("./json/home.json");
const RegisterTemplate = require("./json/register.json");
const ErrorTemplate = require("./json/error.json");

const PlaystationTemplate = require("./json/playstation.json");
const SwitchTemplate = require("./json/switch.json");
const XboxTemplate = require("./json/xbox.json");

const DatabaseManager = require("./database/DatabaseManager.js");
const AccountManager = require("./database/AccountManager.js");
const CartManager = require("./database/CartManager.js");
const WishManager = require("./database/WishManager.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./JavaScript"));
app.use(express.static("./images"));
app.use(express.static("./fonts"));
app.use(express.static("./json"));
app.use(express.static("./css"));

app.use(
  session({
    secret: "WebApp-NodeJs-05",
    cookie: { secure: false },
    saveUninitialized: false,
    resave: false,
  })
);

app.set("view engine", "ejs");

DatabaseManager.ConnectDatabase();

/*------------------------------------------*/
/*-------------- GET REQUESTS --------------*/
/*------------------------------------------*/

app.get("/", (req, res) => {
  req.session.email = "ryan@gmail.com";

  res.render("home", {
    username: req.session.username ?? null,
    navbar: HomeTemplate.navbar,
    header: HomeTemplate.header,
    features: HomeTemplate.features,
    games: HomeTemplate.games,
    details: HomeTemplate.details,
    exclusive: HomeTemplate.exclusive,
    brands: HomeTemplate.brands,
    footer: HomeTemplate.footer,
  });
});

app.get("/register", (req, res) => {
  res.render("register", { register: RegisterTemplate });
});

app.get("/account/cart", async (req, res) => {
  if (req.session.email === undefined) {
    res.redirect("/error/account-absent");
    return;
  }

  const { cart, bill } = await CartManager.GetProducts(req.session.email);

  res.render("cart", { cart: cart, bill: bill });
});

app.get("/account/wishlist", async (req, res) => {
  const wishlist = await WishManager.GetProducts(req.session.email);

  wishlist.originals.forEach((product) => {
    console.log(product.product);
  });

  wishlist.skins.forEach((product) => {
    console.log(product.product);
  });

  wishlist.combos.forEach((product) => {
    console.log(product.product);
  });

  res.redirect("back");
});

app.get("/shop/:brand/:type", (req, res) => {
  if (req.params.brand === "playstation") {
    res.render("shop", {
      classes: PlaystationTemplate[req.params.type],
      footer: PlaystationTemplate.footer,
    });

    return;
  }

  if (req.params.brand === "xbox") {
    res.render("shop", {
      classes: XboxTemplate[req.params.type],
      footer: XboxTemplate.footer,
    });

    return;
  }

  if (req.params.brand === "switch") {
    res.render("shop", {
      classes: SwitchTemplate[req.params.type],
      footer: SwitchTemplate.footer,
    });

    return;
  }
});

app.get("/error/:type", (req, res) => {
  console.log(ErrorTemplate[req.params.type]);
  res.redirect("/");
});

/*-------------------------------------------*/
/*-------------- POST REQUESTS --------------*/
/*-------------------------------------------*/

app.post("/register", (req, res) => {
  if (req.body.type === "CREATE") {
    AccountManager.CreateAccount(req.body, req, res);
    return;
  }

  if (req.body.type === "LOGIN") {
    AccountManager.LoginAccount(req.body, req, res);
    return;
  }
});

app.post("/shop/product", (req, res) => {
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
});

app.post("/account/cart", (req, res) => {
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
});

app.listen(process.env.DEVELOPMENT_PORT, () => {
  console.log(`ACTIVE | PORT: ${process.env.DEVELOPMENT_PORT}`);
});
