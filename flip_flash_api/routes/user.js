const express = require('express')
const { register,signin,getNewAccessToken } = require('../controllers/auth_controller')
const router = express.Router()
const API_Auth = require('../middlewares/apiToken_Auth')

// register user 
router.post('/user/register',API_Auth,register)

// user login 
router.post('/user/login',API_Auth,signin)

// new access token
// router.post('/user/accessToken',API_Auth,getNewAccessToken)
module.exports = router