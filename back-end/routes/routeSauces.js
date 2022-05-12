
const express = require('express')
const router = express.Router()
const ctrl = require('../Controllers/saucesController')
const multer = require('../Middlewares/multer')
const auth = require('../Middlewares/auth')

router.get('/', auth, ctrl.getAll)
router.get('/:id', auth, ctrl.getOne)
router.post('/', auth, multer ,ctrl.addOne)
router.post('/:id/like', auth, ctrl.likeDislikeOne )
router.put('/:id', auth, multer, ctrl.updateOne)
router.delete('/:id', auth, ctrl.deleteOne)

module.exports = router