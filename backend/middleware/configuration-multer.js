const multer = require('multer'); //Faciliter la gestion de fichier envoyé avec des requêtes http vers l'API

const MIME_TYPES = {
    'images/jpg': 'jpg',
    'images/jpeg': 'jpg',
    'images/png': 'png',
};

//Fonction qui explique à multer dans quel dossier engistrer les fichiers
const storage = multer.diskStorage({
    destination: ( req, file, callback) => {
        callback(null, 'images' ) 
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype];     //  La fonction utilise la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée
        callback(null, name + Date.now() + '.' + extension);
    }
});  // Objet de configuration pour multer. Fonction diskStorage pour enregistrer dans le disque 

module.exports = multer ({ storage }).single('image');
