const express = require('express')
const router = express.Router()

const CategoryController = require('../controllers/category_controller')
const auth = require('../middlewares/auth')

// add category
router.post('/category/add',auth,CategoryController.addCategory)

module.exports = router