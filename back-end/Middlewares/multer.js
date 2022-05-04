// importation de multer pour gerer les envoies d'images dans les requetes http
const multer = require('multer');

// dictionnaires des MYME_TYPE
const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};


const storage = multer.diskStorage({
    // destionation du fichier
  destination: (req, file, callback) => {
    callback(null, 'images');
  },
  // nom du fichier
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});

module.exports = multer({storage: storage}).single('image');