const express = require('express');
const router = express.Router();

//  Associer les fonctions aux différentes routes
const userCtrl = require('../controllers/authentication');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

module.exports = router;
