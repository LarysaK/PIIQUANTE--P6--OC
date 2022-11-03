const jwt = require('jsonwebtoken');   //  Verification de token

module.exports = (req, res, next) => {   //  Middleware d'authentification
    try {
        const token = req.headers.authorization.split(' ')[1];  
        //  Utilisation de la fonction verify pour décoder le token et extraction de l'ID user
        const decodedToken = jwt.verify(token, process.env.APP_SECRET); 
        const userId = decodedToken.userId;  //  Si la demande contient un ID user, on compare à celui extrait du token.
        req.auth = {
            userId: userId 
        };
        next();
    }catch (error) {
        res.status(401).json({ error });
    }
};