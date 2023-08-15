const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseLoginAccount = async (account, response) => {
  const databaseAccount = await AccountModel.findOne({ email: account.email });

  if (!databaseAccount) {
    console.log("LOGIN FAILED | ACCOUNT DOES NOT EXIST");
    response.redirect("/account/register");
    return;
  }

  if (account.password !== databaseAccount.password) {
    console.log("LOGIN FAILED | INVALID PASSWORD");
    response.redirect("/account/register");
    return;
  }

  console.log("LOGIN SUCCESSFUL");

  response.redirect("/");
};
