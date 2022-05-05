
const express = require('express')
const router = express.Router()
const ctrl = require('../Controllers/saucesController')
const multer = require('../Middlewares/multer')
const auth = require('../Middlewares/auth')

router.get('/', ctrl.getAll)
router.get('/:id', ctrl.getOne)
router.post('/', auth, multer ,ctrl.addOne)
router.put('/:id', auth, multer, ctrl.updateOne)
router.delete('/:id', auth, ctrl.deleteOne)

module.exports = router