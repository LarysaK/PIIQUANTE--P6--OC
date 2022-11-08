const express = require('express');  // Connexion à Express*/
const mongoose = require('mongoose');  //  Connexion à Mongoose/Mongo DB*/

const dotenv = require('dotenv');  // Mise en place des variables environnement grâce à dotenv
dotenv.config();

//  Connexion aux différentes routes
const userRoutes = require('./routes/auth');
const sauceRoutes = require('./routes/sauce');

const path = require('path'); //  Donne acccès au chemin du systeme de fichier


//  Connection de l'API au cluster mongoDB
const uri = "mongodb+srv://Larysa_Karahieorhii:ndPR0qR9NBDQ8VRi@cluster0.mgkdjxp.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
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


app.use('/api/sauces', sauceRoutes);  //  Enregistrement du routeur pour toutes les demandes effectuées vers /api/sauces
app.use('/api/auth', userRoutes);  //  La racine de toutes les routes liées à l'authentification
app.use('/images', express.static(path.join(__dirname, 'images')));  //  Sert le dossier statique image

module.exports = app; //Permet l'accès depuis les autres fichiers, notamment le serveur Node 