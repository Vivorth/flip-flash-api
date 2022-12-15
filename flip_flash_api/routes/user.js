const express = require('express')
const { register,signin } = require('../controllers/auth_controller')
const router = express.Router()

// register user 
router.post('/user/register',register)

// user login 
router.post('/user/login',signin)

module.exports = router