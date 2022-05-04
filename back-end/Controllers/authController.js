// importation du model User
const User = require("../models/UserModels");

// importation du module bcrypt pour hasher le password
const bcrypt = require("bcrypt");

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
