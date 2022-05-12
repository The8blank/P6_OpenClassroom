const express = require('express');
const app = express();

// importation de path
const path = require('path')

// importation de helmet pour sécuriser les headers http
const helmet = require('helmet')

// Module Mongoose pour base de donnée
const mongoose = require('mongoose')

// importation des variables environement
require('dotenv').config()

//Importation Middlewares
const cors = require('./Middlewares/header')
const routeAuth = require('./routes/routeAuth')
const routeSauces = require('./routes/routeSauces')

// Connexion à la base de donnée
const uri = process.env.URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à la base de donnée PIIQUANTE réussi'))
.catch(() => console.log('Connexion à la base de donnée PIIQUANTE échoué'))

// sécurisation des headers grace à helmet 
app.use(helmet());

// Ajout des header pour recevoir des requete d'un autre server 
app.use(cors.header)

// Parsing du corps de la requete 
app.use(express.json())

// Route pour les requetes vers les sauces
app.use('/api/sauces', routeSauces)

// Routes pour les requetes vers les images
app.use('/images', express.static(path.join(__dirname,'images')))

// Route pour les requetes vers les users
app.use('/api/auth', routeAuth)


module.exports = app;