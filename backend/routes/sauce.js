//  Déportation de la logique routing sur le Router
const express = require('express');
const auth = require('../middleware/authorize');
const router = express.Router();  // Implémenter des routes
const multer = require('../middleware/configuration-multer');
const sauceCtrl = require('../controllers/sauce');

router.post('/', auth, multer, sauceCtrl.createSauce); //  Enregistrer une sauce dans la base de données

router.put('/:id', auth, multer, sauceCtrl.modifySauce); // Mettre à jour une sauce existante 

router.delete('/:id', auth, sauceCtrl.deleteSauce); // Supprimer une sauce

router.get('/:id', auth, sauceCtrl.getOneSauce); //  Récupération d'une sauce spécifique

router.get('/', auth, sauceCtrl.getAllSauce); //  Renvoie toutes les sauces

router.post('/:id/like', auth, sauceCtrl.likeDislikeSauce);

module.exports = router;