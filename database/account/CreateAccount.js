const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseCreateAccount = async (account, response) => {
  const databaseAccount = await AccountModel.findOne({ email: account.email });

  if (databaseAccount) {
    console.log("CREATE FAILED | ACCOUNT ALREADY EXISTS");
    response.redirect("/account/register");
    return;
  }

  const createdAccount = new AccountModel({
    username: account.username,
    email: account.email,
    password: account.password,
    wishlist: [],
    cart: [],
  });

  await createdAccount.save();

  console.log("CREATE SUCCESSFUL");

  response.redirect("/");
};
