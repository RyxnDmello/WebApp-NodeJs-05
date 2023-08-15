require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const HomeTemplate = require("./json/home.json");
const RegisterTemplate = require("./json/register.json");

const PlaystationTemplate = require("./json/playstation.json");
const SwitchTemplate = require("./json/switch.json");
const XboxTemplate = require("./json/xbox.json");

const DatabaseManager = require("./database/DatabaseManager.js");
const AccountManager = require("./database/AccountManager.js");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("./JavaScript"));
app.use(express.static("./images"));
app.use(express.static("./fonts"));
app.use(express.static("./json"));
app.use(express.static("./css"));

app.set("view engine", "ejs");

DatabaseManager.ConnectDatabase();

/*------------------------------------------*/
/*-------------- GET REQUESTS --------------*/
/*------------------------------------------*/

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
      types: PlaystationTemplate[req.params.type].types,
      post: PlaystationTemplate[req.params.type].post,
      footer: PlaystationTemplate.footer,
    });

    return;
  }

  if (req.params.brand === "xbox") {
    res.render("shop", {
      types: XboxTemplate[req.params.type].types,
      post: XboxTemplate[req.params.type].post,
      footer: XboxTemplate.footer,
    });

    return;
  }

  if (req.params.brand === "switch") {
    res.render("shop", {
      types: SwitchTemplate[req.params.type].types,
      post: SwitchTemplate[req.params.type].post,
      footer: SwitchTemplate.footer,
    });

    return;
  }
});

/*-------------------------------------------*/
/*-------------- POST REQUESTS --------------*/
/*-------------------------------------------*/

app.post("/account/:type", (req, res) => {
  if (req.params.type === "login") {
    const account = {
      email: req.body.email,
      password: req.body.password,
    };

    AccountManager.LoginAccount(account, res);
    return;
  }

  const account = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  };

  AccountManager.CreateAccount(account, res);
});

app.post("/shop/:brand/:type/add", function (req, res) {
  const { brand, type } = req.params;

  console.log(`Brand: ${brand} | Type: ${type}`);

  res.redirect("back");
});

app.listen(process.env.DEVELOPMENT_PORT, () => {
  console.log(`ACTIVE | PORT: ${process.env.DEVELOPMENT_PORT}`);
});
