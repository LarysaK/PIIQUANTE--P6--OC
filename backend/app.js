const express = require('express');  // Connexion à Express*/
const mongoose = require('mongoose');  //  Connexion à Mongoose/Mongo DB*/

const dotenv = require('dotenv');  // Mise en place des variables environnement grâce à dotenv
dotenv.config();

const userRoutes = require('./routes/auth');

const path = require('path');


//  Connection de l'API au cluster mongoDB

mongoose.connect('mongodb://localhost:27017', {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Connexion à MongoDB réussie !'))
.catch(error => {console.log("==> error", error)})


const app = express();  //  Création d'une application express (lien entre app et express)
app.use(express.json()); //  fonction middleware intégrée dans Express pour analyse les requêtes JSON entrantes et place les données analysées dans req.body.

//   Middleware appliqué à toutes les routes, permettant l'envoie de requête et d'accéder à l'API 
app.use((req, res, next) => {
    //Accès à l'API depuis n'importe quelle origine
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    //Ajout des headers mentionnés vers l'API
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'); 
    //Envoie de requête avec les méthodes mentionnées
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS'); 
    next(); 
});

module.exports = app; //Permet l'accès depuis les autres fichiers, notamment le serveur Node 