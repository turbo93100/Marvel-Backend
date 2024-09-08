const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
require("dotenv").config();

//--------- Page Characters -------------//

app.get("/characters", async (req, res) => {
  try {
    // console.log(req.query); //http://localhost:3000/characters?name=spider&limit=100&skip=1&apikey=eNaoa8mNIQLUh5CI
    //==>  {apikey: 'eNaoa8mNIQLUh5CI' name: 'spider', limit: '100', skip: '1', apikey: 'eNaoa8mNIQLUh5CI' }

    // Appel des données

    const name = req.query.name || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;

    const response = await axios.get(
      // Ajout des querys pour la barre de recherche : &nomDeLaQuery${req.query.nomDeLaQuery}
      `https://lereacteur-marvel-api.herokuapp.com/characters?apiKey=${process.env.API_KEY}&name=${name}&limit=${limit}&skip=${skip}`
    );

    //console.log(response.data); // OK
    return res.json(response.data.results); // Renvoie un tableau de toutes les informations du héro
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//--------- Page Comics ---------------//

app.get("/comics", async (req, res) => {
  try {
    //console.log(req.query); // { apikey: 'eNaoa8mNIQLUh5CI', title: 'spider', limit: '100', skip: '0' }

    // Appel des données

    const title = req.query.title || "";
    const limit = req.query.limit || 100;
    const skip = req.query.skip || 0;
    //
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}&title=${title}&limit=${limit}&skip=${skip}`
    );
    //console.log(response.data); // OK
    return res.json(response.data.results); // Renvoie un tableau des informations de la BD
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

//--------- Recherche des Comics avec des informations spécifiques -----//

app.get("/comics/:characterId", async (req, res) => {
  //console.log(req.params);
  const { characterId } = req.params;
  //console.log(characterId); //Id du personnage
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${characterId}?apiKey=${process.env.API_KEY}`
    );
    return res.json(response.data);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});
//---------- Récupération des données Characters avec leur code Id ----------//

/* // création d'un route en fonction de l'id

app.get("/character/:characterId", async (req, res) => {

  // Récupération de l'Id depuis les paramètres de l'URL

  const { characterId } = req.params;
  //console.log(characterId); OK
  //console.log(process.env.API_KEY); OK

  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/character/${characterId}?apiKey=${process.env.API_KEY}`
    );
    return res.json(response.data); // Renvoie les données
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}); */

//--------Si la page demandée n'existe pas ----//

app.all("*", (req, res) => {
  return res.status(404).json(" Page not found");
});

//------Démarrage du serveur-------//

app.listen(process.env.PORT, () => {
  console.log("Server started on port : " + process.env.PORT);
});
