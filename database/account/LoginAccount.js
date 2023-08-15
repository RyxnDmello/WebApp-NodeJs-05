const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseLoginAccount = async (account, request, response) => {
  const databaseAccount = await AccountModel.findOne({ email: account.email });

  if (!databaseAccount) {
    response.redirect("/error/account-absent");
    return;
  }

  if (account.password !== databaseAccount.password) {
    response.redirect("/error/invalid-password");
    return;
  }

  request.session.username = databaseAccount.username;
  request.session.email = databaseAccount.email;

  response.redirect("/");
};
