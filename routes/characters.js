const express = require("express");
const axios = require("axios");

const router = express.Router();

const Character = require("../models/Characters");

router.get("/characters", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.apiKey}`
    );
    res.json({ response });
  } catch (error) {
    console.log("error ===>", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
