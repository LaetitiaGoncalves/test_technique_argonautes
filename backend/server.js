const express = require("express");
const axios = require("axios");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.MONGODB_URL);

const Argonaute = require("./models/Argonaute");

// Route ajout d'un nouvel argonaute

app.post("/argonaute", async (req, res) => {
  try {
    // Si le name n'est pas rempli renvoie un message d'erreur
    if (req.body.name === "") {
      res.status(401).json({ message: "Missing parameter" });
    } else {
      // Chercher dans la BDD un argonaute existant
      const isArgonauteAlreadyInBDD = await Argonaute.findOne({
        name: req.body.name,
      });
      //   Si l'argonaute existe déja -> message d'erreur
      if (isArgonauteAlreadyInBDD !== null) {
        res.status(402).json({ message: "This argonaute already exist !" });
      } else {
        // Sinon, créer un nouvel argonaute
        const newArgonaute = new Argonaute({
          name: req.body.name,
        });

        await newArgonaute.save();
        res.json(newArgonaute);
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route afficher les noms des argonautes

app.get("/allTheArgonautes", async (req, res) => {
  try {
    const argonautes = await Argonaute.find();
    res.status(200).json(argonautes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.all("*", (req, res) => {
  res.status(404).json({ message: "route not found !" });
});

app.listen(process.env.PORT, () => {
  console.log("Server has started");
});
