const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

require("dotenv").config();

mongoose.connect("mongodb://localhost:27017/marvel");

// Import des routers
const comicsRouter = require("./routes/comics");
const characterRouter = require("./routes/character");

// Utilisattion des routers
app.use(comicsRouter);
app.use(characterRouter);

app.all("*", (req, res) => {
  res.status(500).json({ message: error.message });
});

app.listen(3000, () => {
  console.log("Server started 🚀");
});
