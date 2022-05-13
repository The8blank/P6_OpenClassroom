const express = require('express')
const router = express.Router()
const passwordValidator = require('../Middlewares/checkPassword')
const emailValidator = require('../Middlewares/checkEmail')

// importation des controllers
const ctrl = require('../Controllers/authController')
const checkEmail = require('../Middlewares/checkEmail')

// route inscription
router.post('/signup', checkEmail, passwordValidator, ctrl.signup)
// route login
router.post('/login', ctrl.login )



module.exports = router;