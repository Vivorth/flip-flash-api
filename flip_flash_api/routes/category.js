const express = require('express')
const router = express.Router()

const CategoryController = require('../controllers/category_controller')
const auth = require('../middlewares/auth')

// add category
router.post('/category/add',auth,CategoryController.addCategory)

// get category 
router.get('/category/get',auth,CategoryController.getCategoryByUserID)
module.exports = router