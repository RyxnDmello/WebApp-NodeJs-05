const ErrorTemplate = require("../json/error.json");

const error = (req, res) => {
  console.log(ErrorTemplate[req.params.type]);
  res.redirect("/");
};

module.exports = {
  error,
};
