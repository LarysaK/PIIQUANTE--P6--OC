const mongoose = require('mongoose');

const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email: {type: String, required: true, unique: true },
    password: {type: String, required: true },
});


//  Appliquer validator au schema avant d'en faire un modèle. Impossible d'avoir plusieurs utilisateurs inscrits avec la même adresse e-mail
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);