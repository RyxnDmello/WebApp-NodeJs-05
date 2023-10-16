const HomeTemplate = require("../json/home.json");
const RegisterTemplate = require("../json/register.json");

const AccountManager = require("../database/AccountManager.js");

const home = (req, res) => {
  req.session.email = "ryan@gmail.com";
  req.session.username = "RyxnDmello";

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
};

const register = (req, res) => {
  res.render("register", { register: RegisterTemplate });
};

const create = (req, res) => {
  if (req.body.type === "CREATE") {
    AccountManager.CreateAccount(req.body, req, res);
    return;
  }

  if (req.body.type === "LOGIN") {
    AccountManager.LoginAccount(req.body, req, res);
    return;
  }
};

module.exports = {
  home,
  register,
  create,
};
