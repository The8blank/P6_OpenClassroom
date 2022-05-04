const express = require('express')
const router = express.Router()

// importation des controllers
const ctrl = require('../Controllers/authController')


router.post('/signup', ctrl.signup)
router.post('/login',ctrl.login )



module.exports = router;