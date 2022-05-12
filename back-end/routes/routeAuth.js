const express = require('express')
const router = express.Router()
const passwordValidator = require('../Middlewares/checkPassword')
const emailValidator = require('../Middlewares/checkEmail')

// importation des controllers
const ctrl = require('../Controllers/authController')
const checkEmail = require('../Middlewares/checkEmail')


router.post('/signup',checkEmail,passwordValidator, ctrl.signup)
router.post('/login',ctrl.login )



module.exports = router;