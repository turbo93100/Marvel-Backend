const mongoose = require("mongoose");

const Character = mongoose.model("Character", {
  Picture: String,
  Name: String,
  Desription: String,
});

module.exports = Character;
