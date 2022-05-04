// importation du module mongoose
const mongoose = require('mongoose')

// importation du plugin uniqueValidator 
const uniqueValidator = require('mongoose-unique-validator')

// Déclaration du schéma User
const UserSchema = new mongoose.Schema({
    email : {type: String, required: true, unique: true},
    
    password: {type: String, required: true},

})

UserSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Users', UserSchema)