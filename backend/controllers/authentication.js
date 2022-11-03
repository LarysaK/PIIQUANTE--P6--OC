//Le package bcrpyt permet un cryptage sécurisé avec un algorithme unidirectionnel
const bcrypt = require('bcrypt');

//Créer et vérifier les tokens d'authentification
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.signup = (req, res, next) => {
    //Execution de l'algorythme de hashage, "saler" le mdp 10 fois
    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
                .catch(error => res.status(400).json({ error }));
        })
        // Recuperation du hash du mdp qu'on va enregistrer dans un nouvel user, ensuite enregistré dans la base de donnée
        .catch(error => res.status(500).json({ error }));
};

//  Vérifier que l'e-mail entré par l'utilisateur correspond à un utilisateur existant de la base de données
exports.login = (req, res, next) => { 
    //  Objet filtre : l'utilisateur pour qui l'adresse mail correspond à ladresse mail envoyée dans la requête 
    User.findOne({ email: req.body.email })
        .then(user => {
            if (user === null) {
                return res.status(401).json({ message: 'Utilisateur non trouvé !' });
            }
            //comparaison du mot de passe entré par l'user avec le hash enregistré dans la base de données
            bcrypt.compare(req.body.password, user.password) 
                .then(valid => {
                    if (!valid) {
                        return res.status(401).json({ message: 'Mot de passe incorrect !' });
                    }
                    res.status(200).json({
                        userId: user._id,
                        token: jwt.sign(
                            { userId: user._id },
                            process.env.APP_SECRET,
                            { expiresIn: '24h' }
                        )
                    });
                })
                .catch(error => res.status(500).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};