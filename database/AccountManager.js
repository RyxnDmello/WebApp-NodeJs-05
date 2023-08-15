const { DatabaseCreateAccount } = require("./account/CreateAccount.js");
const { DatabaseLoginAccount } = require("./account/LoginAccount.js");

module.exports.CreateAccount = (account, response) => {
  DatabaseCreateAccount(account, response);
};

module.exports.LoginAccount = (account, response) => {
  DatabaseLoginAccount(account, response);
};
