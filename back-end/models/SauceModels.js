const mongoose = require('mongoose')

const sauceSchema = mongoose.Schema({
    userId : {type: String, require: true},
    name: {type: String, require: true},
    manufacturer : {type: String, require: true},
    description: { type: String, required: true }, 
    mainPepper: {type: String, require: true},
    imageUrl: {type: String, require: true},
    heat: {type: Number, require: true},
    likes: {type: Number, default: 0, required: true},
    dislikes: {type: Number, default: 0, required: true},
    usersLiked: { type: [String], required: true },
    usersDisliked: { type: [String], required: true},
})

module.exports = mongoose.model('Sauce', sauceSchema)