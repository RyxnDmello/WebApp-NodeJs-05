const { DatabaseCreateAccount } = require("./account/CreateAccount.js");
const { DatabaseLoginAccount } = require("./account/LoginAccount.js");

module.exports.CreateAccount = (account, request, response) => {
  DatabaseCreateAccount(account, request, response);
};

module.exports.LoginAccount = (account, request, response) => {
  DatabaseLoginAccount(account, request, response);
};
