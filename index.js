require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");

const HomeTemplate = require("./json/home.json");
const RegisterTemplate = require("./json/register.json");

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

app.listen(process.env.DEVELOPMENT_PORT, () => {
  console.log(`ACTIVE | PORT: ${process.env.DEVELOPMENT_PORT}`);
});
