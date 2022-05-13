
const express = require('express')
const router = express.Router()
const ctrl = require('../Controllers/saucesController')
const multer = require('../Middlewares/multer')
const auth = require('../Middlewares/auth')

// Routes sauces
// Routes pour avoir toutes les sauces
router.get('/', auth, ctrl.getAll)
// Routes pour avoir une sauce 
router.get('/:id', auth, ctrl.getOne)
//Routes pour ajouter une sauce
router.post('/', auth, multer ,ctrl.addOne)
// Routes pour like ou dis like une sauce
router.post('/:id/like', auth, ctrl.likeDislikeOne )
// Routes pour modifier une sauce
router.put('/:id', auth, multer, ctrl.updateOne)
// Routes pour supprimer une sauce
router.delete('/:id', auth, ctrl.deleteOne)

module.exports = router