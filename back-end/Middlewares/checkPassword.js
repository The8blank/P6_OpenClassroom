const passwordSchema = require('../models/passwordsModels');

module.exports = (req, res, next) => {
    // compare le password au model de celui ci 
    if (!passwordSchema.validate(req.body.password)) {
        res.status(400).json({ message: 'Le MDP doit faire 8 caractère au moins, avec une maj, une min et un chiffre au moins.' });
    } else {
        next();
    }
};