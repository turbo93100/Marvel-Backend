const mongoose = require("mongoose");

const Comics = mongoose.model("Comics", {
  Picture: String,
  Title: String,
  Description: String,
});

module.exports = Comics;
