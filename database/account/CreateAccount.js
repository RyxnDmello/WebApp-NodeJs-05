const { AccountModel } = require("../models/AccountModel.js");

module.exports.DatabaseCreateAccount = async (account, request, response) => {
  const databaseAccount = await AccountModel.findOne({ email: account.email });

  if (databaseAccount) {
    response.redirect("/error/account-exists");
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

  request.session.username = createdAccount.username;
  request.session.email = createdAccount.email;

  response.redirect("/");
};
