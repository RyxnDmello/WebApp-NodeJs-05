require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const app = express();

const { ConnectDatabase } = require("./database/DatabaseManager.js");

const HomeRouter = require("./routes/Home.js");
const AccountRouter = require("./routes/Account.js");
const ShopRouter = require("./routes/Shop.js");
const ErrorRouter = require("./routes/Error.js");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

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

ConnectDatabase();

app.use("/", HomeRouter);
app.use("/account", AccountRouter);
app.use("/shop", ShopRouter);
app.use("/error", ErrorRouter);

app.listen(process.env.DEVELOPMENT_PORT, () => {
  console.log(`ACTIVE | PORT: ${process.env.DEVELOPMENT_PORT}`);
});
