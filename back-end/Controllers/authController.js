// importation du model User
const User = require("../models/UserModels");

// importation du module pour la creation de token
const jwt = require("jsonwebtoken");

// importation du module bcrypt pour hasher le password
const bcrypt = require("bcrypt");

// Logique métier signup 
exports.signup = (req, res, next) => {
  // Définit une regex email
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );

  // Test la regex email 
  if (!emailRegex.test(req.body.email)) {
    console.log(`l'utilisateur à entré un email non valide`);
    res.status(400).json({ message: `l'email n'est pas valide` });
    res.end();
  } else {
    // Si l'email est valide, hash le mot de passe
    bcrypt.hash(req.body.password, 15).then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

      // Envoie le nouvel utilisiteur dans la base de donnée
      user
        .save()
        .then(() => {
          res.status(201).json({ message: "Utilisateur créé !" });
          console.log("Utilisateur crée dans la base de donnée :");
          console.log(req.body);
        })
        .catch((error) => res.status(400).json({ error }));
    });
  }
};

// Logique métier login
exports.login = (req, res, next) => {
  // Trouve l'user qui correspond a l'email entré
  User.findOne({email : req.body.email}).then((user) => {
    // Si il y a un user
    if (user) {
      // compare le hash du mot de passe à celui entré
      bcrypt.compare(req.body.password, user.password)
      // S'il est valide renvoie le token et l'userID

      .then((valid) => {
        if (valid){
          res.status(200).json({
            userId : user._id,
            token: jwt.sign(
              {userId: user._id},
              'RANDOM_TOKEN_SECRET',
              {expiresIn: '24h'}
            )
          })
          console.log('Utilisateur connecté');
          console.log(req.body);
        }
        else {
          // Sinon renvoie un mdp incorect 
          return res.status(401).json({ error: "Mot de passe incorrect" });
        }
      });
    } else {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
  });
};
