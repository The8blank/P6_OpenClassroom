// Importe le model Sauce
const Sauce = require("../models/SauceModels");
// Importe fs pour supprimer des fichier en local 
const fs = require('fs')

// Logique métier pour récupérer toutes les sauces
exports.getAll = (req, res, next) => {
  Sauce.find({})
    .then((sauces) => res.status(200).json(sauces))
    .catch((error) => res.status(404).json({ error }));
};

// Logique métier pour récupérer une sauce grace à l'id dans l'url 
exports.getOne = (req, res, next) => {
    Sauce.findById(req.params.id)
    .then((sauce) => res.status(200).json(sauce))
    .catch((error) => json.status(400).json({error}))
}

// Logique métier pour ajouté une sauce à la db
exports.addOne = (req, res, next) => {
  // définit l'objet sauce grâce à la requète
  const sauceObject = JSON.parse(req.body.sauce);

  // crée le nouvel objet Sauce et définit l'adresse de son image
  const sauce = new Sauce({
    ...sauceObject,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
    likes: 0,
    dislikes: 0,
    usersLiked: [" "],
    usersdisLiked: [" "],
  });

  // Sauvegarde la sauce dans la base de donnée 
  sauce
    .save()
    .then(() => res.status(201).json({ message: "Sauce enregistrée" }))
    .catch((error) => res.status(400).json({ error }));

    console.log('sauce ajouté dans la base de donnée');
};

// Logique métier pour la mise à jour d'une sauce
exports.updateOne = (req, res, next) => {

  // si la requete contien un fichier, parse la requete et définis l'adresse de l'image
  // sinon crée l'objet l'objet sauce grace au body de la requette
  sauceObject = req.file ? 
  {...JSON.parse(req.body.sauce), 
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`} : {...req.body}
  
  // trouve la sauce concerné
  Sauce.findById({_id: req.params.id})
  .then((sauce) => {

    // vérifie que la sauce est mit à jour par son créateur en comparant son token a l'userId de la sauce
    if (req.auth.userId !== sauce.userId){
      res.status(400).json({error: new Error('Unauthorized request!')})
    }else{

      // si il y a un fichier 
      if (req.file) {

        // trouve la sauce grâce à son id
        Sauce.findById({_id: req.params.id})
        .then((sauce) => {

          // supprime l'ancienne photo
          fs.unlink(`images/${sauce.imageUrl.split('/images/')[1]}`, (err) => {
            if (err) throw err
            else console.log("image update");
          })
        })
  
      }
      
      // met à jour la sauce dans la base de donnée
      Sauce.updateOne({_id: req.params.id}, {...sauceObject, _id: req.params.id})
      .then(res.status(200).json({ message : "Sauce modifiée"}))
      .catch(error => res.status(400).json({ error }))
    }

  })

  console.log('Sauce update');
}

// Logique métier supression d'une sauce
exports.deleteOne = (req, res, next) => {

  // trouve la sauce dans la base de donnée grace à son id
    Sauce.findById({_id:req.params.id})
    .then( (sauce) => {
      // s'il n'y a pas de sauce 
      if (!sauce){
        res.status(400).json({message: "sauce non trouvé"})
      }

      // vérifie que la supression provient du créateur
      if (req.auth.userId !== sauce.userId){
        console.log('faux');
        res.status(400).json({message : "requete invalide"})
      }else {
        // définit le nom de l'image à suprimmé
        const filename = sauce.imageUrl.split('/images/')[1]

        // supprime l'image du serveur 
        fs.unlink(`images/${filename}`, () => {
          // supprime la sauce de la base de donnée
            Sauce.deleteOne({ _id: req.params.id })
              .then(() => res.status(200).json({ message: "Sauce supprimé !"}))
              .catch(error => res.status(400).json({ error }));
          });
      }
    })
}

exports.likeDislikeOne = (req, res, next) => {
  let like = req.body.like
  let userId = req.body.userId
  let sauceId = req.params.id
  
  switch (like) {
    case 1 :
        Sauce.updateOne({ _id: sauceId }, { $push: { usersLiked: userId }, $inc: { likes: +1 }})
          .then(() => res.status(200).json({ message: `J'aime` }))
          .catch((error) => res.status(400).json({ error }))
            
      break;

    case 0 :
        Sauce.findOne({ _id: sauceId })
           .then((sauce) => {
            if (sauce.usersLiked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersLiked: userId }, $inc: { likes: -1 }})
                .then(() => res.status(200).json({ message: `Neutre` }))
                .catch((error) => res.status(400).json({ error }))
            }
            if (sauce.usersDisliked.includes(userId)) { 
              Sauce.updateOne({ _id: sauceId }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 }})
                .then(() => res.status(200).json({ message: `Neutre` }))
                .catch((error) => res.status(400).json({ error }))
            }
          })
          .catch((error) => res.status(404).json({ error }))
      break;

    case -1 :
        Sauce.updateOne({ _id: sauceId }, { $push: { usersDisliked: userId }, $inc: { dislikes: +1 }})
          .then(() => { res.status(200).json({ message: `Je n'aime pas` }) })
          .catch((error) => res.status(400).json({ error }))
      break;
      
      default:
        console.log(error);
  }
}
