const express = require('express')
const { register,signin } = require('../controllers/auth_controller')
const router = express.Router()
const API_Auth = require('../middlewares/apiToken_Auth')

// register user 
router.post('/user/register',API_Auth,register)

// user login 
router.post('/user/login',signin)

module.exports = router