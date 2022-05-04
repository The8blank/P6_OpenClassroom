// importation du model User
const User = require("../models/UserModels");

// importation du module pour la creation de token
const jwt = require("jsonwebtoken");

// importation du module bcrypt pour hasher le password
const bcrypt = require("bcrypt");
const user = require("../../../go-fullstack-v3-fr/backend/models/user");

exports.signup = (req, res, next) => {
  const emailRegex = new RegExp(
    "^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$"
  );

  if (!emailRegex.test(req.body.email)) {
    console.log(`l'utilisateur à entré un email non valide`);
    res.status(400).json({ message: `l'email n'est pas valide` });
    res.end();
  } else {
    bcrypt.hash(req.body.password, 15).then((hash) => {
      const user = new User({
        email: req.body.email,
        password: hash,
      });

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

exports.login = (req, res, next) => {
  User.findOne({email : req.body.email}).then((user) => {
    if (user) {
      bcrypt.compare(req.body.password, user.password)
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
          return res.status(401).json({ error: "Mot de passe incorrect" });
        }
      });
    } else {
      return res.status(401).json({ error: "Utilisateur non trouvé !" });
    }
  });
};
