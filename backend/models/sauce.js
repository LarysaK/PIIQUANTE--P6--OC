const mongoose = require('mongoose');

//  Creation schema de donnée. Un modèle de donnée qui permet d'enregistrer, lire et modifier les objets qui sont en vente dans la base de donnée
const sauceSchema = mongoose.Schema({
    userId: {type: String, required: true },
    name: {type: String, required: true },
    manufacturer: {type: String, required: true },
    description: {type: String, required: true },
    mainPepper: {type: String, required: true },
    imageUrl: {type: String, required: true },
    heat: {type: Number, required: true },
    likes: {type: Number, default:0 },
    dislikes: {type: Number, default:0 },
    usersLiked: {type: [String]},
    usersDisliked: {type: [String]}
});

//  Exportation du schema en tant que modèle Mongoose apppelée Sauce, et rendu disponible pour express 
module.exports = mongoose.model('Sauce', sauceSchema);