const jwt = require('jsonwebtoken');

// importation des variables environnement
require('dotenv').config()

module.exports = (req, res, next) => {
  try {
    // récupère le token dans le header
    const token = req.headers.authorization.split(' ')[1];
    // decode le token 
    const decodedToken = jwt.verify(token, process.env.TOKEN);
    // récupère l'userId dans le token
    const userId = decodedToken.userId;
    // ajoute l'user id dans la requete
    req.auth = { userId }
    // compare les user id
    if (req.body.userId && req.body.userId !== userId) {
      throw 'Invalid user ID';
    } else {
      next();
    }
  } catch {
    res.status(403).json({
      error: new Error('Unauthorized request')
    });
  }
};