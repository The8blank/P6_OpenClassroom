const express = require('express');
const app = express();

// Module Mongoose pour base de donnée
const mongoose = require('mongoose')

//Importation Middlewares
const cors = require('./Middlewares/header')
const routeAuth = require('./routes/routeAuth')

// Connexion à la base de donnée
const uri = "mongodb+srv://mordiate:mordiate4@cluster0.gnv92.mongodb.net/PIIQUANTEDatabase?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à la base de donnée PIIQUANTE réussi'))
.catch(() => console.log('Connexion à la base de donnée PIIQUANTE échoué'))

// Ajout des header pour recevoir des requete d'un autre server 
app.use(cors.header)

// Parsing du corps de la requete 
app.use(express.json())



app.use('/api/auth', routeAuth)


module.exports = app;