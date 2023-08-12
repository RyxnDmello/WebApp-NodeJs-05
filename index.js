require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const HomeTemplate = require("./json/home.json");
const RegisterTemplate = require("./json/register.json");

const PlaystationTemplate = require("./json/playstation.json");
const SwitchTemplate = require("./json/switch.json");
const XboxTemplate = require("./json/xbox.json");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./JavaScript"));
app.use(express.static("./images"));
app.use(express.static("./fonts"));
app.use(express.static("./json"));
app.use(express.static("./css"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("home", {
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

app.get("/account/:type", (req, res) => {
  res.render("register", { register: RegisterTemplate });
});

app.get("/shop/:brand/:type", (req, res) => {
  if (req.params.brand === "playstation") {
    res.render("shop", {
      products: PlaystationTemplate[req.params.type],
      footer: PlaystationTemplate.footer,
    });

    return;
  }

  if (req.params.brand === "xbox") {
    res.render("shop", {
      products: XboxTemplate[req.params.type],
      footer: XboxTemplate.footer,
    });

    return;
  }

  if (req.params.brand === "switch") {
    res.render("shop", {
      products: SwitchTemplate[req.params.type],
      footer: SwitchTemplate.footer,
    });

    return;
  }
});

app.post("/account/:type", (req, res) => {
  if (req.params.type === "login") {
    console.log(req.body.email);
    console.log(req.body.password);

    res.redirect("/account/register");
    return;
  }

  console.log(req.body.email);
  console.log(req.body.username);
  console.log(req.body.password);

  res.redirect("/account/register");
});

app.post("/shop/item/add", function (req, res) {
  const playstationTypes = PlaystationTemplate.consoles;
  const xboxTypes = XboxTemplate.consoles;

  playstationTypes.originals.forEach((product) => {
    if (product.ID === req.body.ID) console.log(product);
  });

  playstationTypes.skins.forEach((product) => {
    if (product.ID === req.body.ID) console.log(product);
  });

  xboxTypes.originals.forEach((product) => {
    if (product.ID === req.body.ID) console.log(product);
  });

  xboxTypes.skins.forEach((product) => {
    if (product.ID === req.body.ID) console.log(product);
  });

  res.redirect("back");
});

app.listen(process.env.DEVELOPMENT_PORT, () => {
  console.log(`ACTIVE | PORT: ${process.env.DEVELOPMENT_PORT}`);
});
